import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Request } from 'express';
import { ContactMapper } from './contact.mapper';
import { ContactResponse } from './response/contact.response';

@Controller('/contacts')
@UseGuards(AuthGuard())
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly contactMapper: ContactMapper,
  ) {}

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: Request,
  ): Promise<ContactResponse> {
    const userId = req['user'].id;
    const contact = await this.contactService.create(createContactDto, userId);
    return this.contactMapper.get(contact);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<ContactResponse> {
    const contact = await this.contactService.update(id, updateContactDto);
    return this.contactMapper.get(contact);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<ContactResponse> {
    const contact = await this.contactService.remove(id);
    return this.contactMapper.get(contact);
  }
}
