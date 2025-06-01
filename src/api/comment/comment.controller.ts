import { CommentService } from './comment.service';
import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponse } from './response/comment.response';
import { CommentWithVolunteerResponse } from './response/comment-with-volunteer.response';
import { CommentMapper } from './comment.mapper';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentMapper: CommentMapper,
  ) {}

  @UseGuards(AuthGuard())
  @Post('/:shelterId')
  async createComment(
    @Req() req: Request,
    @Param('shelterId') shelterId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentResponse> {
    const volunteerId = req['user'].id;
    const comment = await this.commentService.createComment(
      volunteerId,
      shelterId,
      createCommentDto,
    );
    return this.commentMapper.get(comment);
  }

  @Get('/:shelterId')
  async getCommentsByShelter(
    @Param('shelterId') shelterId: string,
  ): Promise<CommentWithVolunteerResponse[]> {
    const comments = await this.commentService.getCommentsByShelter(shelterId);
    return this.commentMapper.getWithVolunteer(comments);
  }
}
