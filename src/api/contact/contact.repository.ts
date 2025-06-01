import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Contact, Prisma } from '@prisma/client';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ContactUncheckedCreateInput): Promise<Contact> {
    return this.prisma.contact.create({ data });
  }

  async findById(id: string): Promise<Contact | null> {
    return this.prisma.contact.findFirst({ where: { id } });
  }

  async updateById(
    id: string,
    data: Prisma.ContactUncheckedUpdateInput,
  ): Promise<Contact> {
    return this.prisma.contact.update({ where: { id }, data });
  }

  async deleteById(id: string): Promise<Contact> {
    return this.prisma.contact.delete({ where: { id } });
  }
}
