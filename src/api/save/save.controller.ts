import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Request } from 'express';
import { SaveService } from './save.service';
import { SaveWithPetEntity } from './entity/save-with-pet.entity';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post(':petId')
  @UseGuards(AuthGuard())
  createSave(
    @Param('petId') petId: string,
    @Req() req: Request,
  ): Promise<SaveWithPetEntity> {
    return this.saveService.savePet(req['user'].id, petId);
  }

  @Delete(':petId')
  @UseGuards(AuthGuard())
  deleteSave(
    @Param('petId') petId: string,
    @Req() req: Request,
  ): Promise<SaveWithPetEntity> {
    return this.saveService.deleteSavedPet(req['user'].id, petId);
  }

  @Get()
  @UseGuards(AuthGuard())
  getSavedPets(@Req() req: Request): Promise<SaveWithPetEntity[]> {
    return this.saveService.getSavedPetsByUser(req['user'].id);
  }
}
