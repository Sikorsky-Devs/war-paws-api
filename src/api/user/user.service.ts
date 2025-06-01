import { Injectable } from '@nestjs/common';
import { FileService } from '../../file/file.service';
import { UserUpdateDto } from './dto/user-update.dto';
import * as bcrypt from 'bcryptjs';
import { PasswordIsNotValidException } from '../../utils/exception/password-is-not-valid.exception';
import { AccountType, Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../../database/prisma.service';
import { EntityNotFoundException } from '../../utils/exception/entity-not-found.exception';
import { UserResponse } from './response/user.response';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly fileService: FileService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async getById(userId: string): Promise<UserResponse> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        middleName: true,
        lastName: true,
        name: true,
        accountType: true,
        shelterType: true,
        address: true,
        description: true,
        donationLink: true,
        avatarLink: true,
        shelterComments: true,
      },
    });
    if (!user) {
      throw new EntityNotFoundException('User', 'id');
    }
    const avg =
      user.shelterComments.reduce((acc, comment) => acc + comment.stars, 0) /
      user.shelterComments.length;
    delete user.shelterComments;
    return {
      ...user,
      stars: Math.round(avg * 10) / 10,
    };
  }

  getAllShelters() {
    return this.userRepository.findMany({
      where: { accountType: AccountType.SHELTER },
    });
  }

  async getUserChats(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new EntityNotFoundException('User', 'id');
    }

    return user.accountType === AccountType.SHELTER
      ? this.getShelterChats(userId)
      : this.getVolunteerChats(userId);
  }

  private async getShelterChats(userId: string) {
    const existingUser = {};
    const uniqueChats = [];
    const messages = await this.prisma.message.findMany({
      where: { shelterId: userId },
      include: {
        volunteer: {
          select: {
            id: true,
            email: true,
            accountType: true,
            name: true,
            firstName: true,
            lastName: true,
            middleName: true,
            avatarLink: true,
          },
        },
      },
      omit: {
        id: true,
        from: true,
        content: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    for (const message of messages) {
      if (existingUser[message.volunteerId]) {
        continue;
      }
      existingUser[message.volunteerId] = true;
      uniqueChats.push(message.volunteer);
    }

    return uniqueChats;
  }

  private async getVolunteerChats(userId: string) {
    const existingUser = {};
    const uniqueChats = [];
    const messages = await this.prisma.message.findMany({
      where: { volunteerId: userId },
      include: {
        shelter: {
          select: {
            id: true,
            email: true,
            accountType: true,
            name: true,
            firstName: true,
            lastName: true,
            middleName: true,
            avatarLink: true,
          },
        },
      },
      omit: {
        id: true,
        from: true,
        content: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    for (const message of messages) {
      if (existingUser[message.shelterId]) {
        continue;
      }
      existingUser[message.shelterId] = true;
      uniqueChats.push(message.shelter);
    }

    return uniqueChats;
  }

  getUserContacts(userId: string) {
    return this.prisma.contact.findMany({ where: { userId } });
  }

  async updateAvatar(file: Express.Multer.File, userId: string) {
    const link = this.fileService.uploadFile(file);
    const user = await this.userRepository.findById(userId);
    if (user.avatarLink) {
      this.fileService.deleteFile(user.avatarLink);
    }
    await this.userRepository.update(userId, { avatarLink: link });
    return { link };
  }

  async update(
    { currentPassword, newPassword, ...dto }: UserUpdateDto,
    userId: string,
  ) {
    const data: Prisma.UserUpdateInput = { ...dto };
    if (newPassword && currentPassword) {
      const user = await this.userRepository.findById(userId);
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new PasswordIsNotValidException();
      }
      data.password = await this.authService.hashPassword(newPassword);
    }
    return this.userRepository.update(userId, data);
  }

  async deleteById(userId: string) {
    const user = await this.userRepository.deleteById(userId);
    if (user.avatarLink) this.fileService.deleteFile(user.avatarLink);
    return user;
  }
}
