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

@Injectable()
export class UserService {
  constructor(
    private readonly fileService: FileService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
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
    return this.prisma.user.findMany({
      where: { accountType: AccountType.SHELTER },
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
  }

  async getUserChats(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new EntityNotFoundException('User', 'id');
    }

    const existingUser = {};
    const uniqueChats = [];
    const messages = await this.prisma.message.findMany({
      where:
        user.accountType === AccountType.SHELTER
          ? { shelterId: userId }
          : { volunteerId: userId },
      include: {
        volunteer: true,
        shelter: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    for (const message of messages) {
      if (
        existingUser[
          user.accountType === AccountType.SHELTER
            ? message.volunteerId
            : message.shelterId
        ]
      ) {
        continue;
      }
      existingUser[
        user.accountType === AccountType.SHELTER
          ? message.volunteerId
          : message.shelterId
      ] = true;
      uniqueChats.push(message);
    }
    return uniqueChats;
  }

  getUserContacts(userId: string) {
    return this.prisma.contact.findMany({ where: { userId } });
  }

  async updateAvatar(file: Express.Multer.File, userId: string) {
    const link = this.fileService.uploadFile(file);
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (user.avatarLink) {
      this.fileService.deleteFile(user.avatarLink);
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarLink: link },
    });
    return { link };
  }

  async update(
    { currentPassword, newPassword, ...dto }: UserUpdateDto,
    userId: string,
  ) {
    const data: Prisma.UserUpdateInput = { ...dto };
    if (newPassword && currentPassword) {
      const user = await this.prisma.user.findFirst({ where: { id: userId } });
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new PasswordIsNotValidException();
      }
      data.password = await this.authService.hashPassword(newPassword);
    }
    return this.prisma.user.update({
      where: { id: userId },
      data,
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
      },
    });
  }

  async deleteById(userId: string) {
    const user = await this.prisma.user.delete({
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
      },
    });
    if (user.avatarLink) this.fileService.deleteFile(user.avatarLink);
    return user;
  }
}
