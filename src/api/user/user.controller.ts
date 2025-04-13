import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserUpdateDto } from './dto/user-update.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/shelters')
  getAllShelters() {
    return this.userService.getAllShelters();
  }

  @UseGuards(AuthGuard())
  @Get('/chats')
  getUserChats(@Req() req: Request) {
    return this.userService.getUserChats(req['user'].id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Get('/:id/contacts')
  getUserContacts(@Param('id') id: string) {
    return this.userService.getUserContacts(id);
  }

  @Patch('/avatars/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.userService.updateAvatar(file, req['user'].id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Body() body: UserUpdateDto, @Param('id') id: string) {
    return this.userService.update(body, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
}
