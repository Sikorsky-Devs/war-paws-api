import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { EntityNotFoundException } from '../../utils/exception/entity-not-found.exception';
import { ContactRepository } from './contact.repository';
import { Contact } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  create(data: CreateContactDto, userId: string): Promise<Contact> {
    return this.contactRepository.create({ ...data, userId });
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new EntityNotFoundException('Contact', 'id');
    }
    return this.contactRepository.updateById(id, data);
  }

  async remove(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new EntityNotFoundException('Contact', 'id');
    }
    return this.contactRepository.deleteById(id);
  }
}
