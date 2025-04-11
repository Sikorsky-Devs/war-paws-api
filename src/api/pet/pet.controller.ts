import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { PetCreateDto } from './dto/pet-create.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccountType } from '@prisma/client';
import { PetQueriesDto } from './dto/pet-queries.dto';

@ApiTags('Pet')
@Controller('/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() body: PetCreateDto) {
    return this.petService.create(body);
  }

  @Patch('/:id/images')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.petService.uploadImage(file, id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard(AccountType.SHELTER))
  update(@Body() body: PetCreateDto, @Param('id') id: string) {
    return this.petService.update(id, body);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.petService.getById(id);
  }

  @Get()
  getMany(@Query() dto: PetQueriesDto) {
    return this.petService.getMany(dto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(AccountType.SHELTER))
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
