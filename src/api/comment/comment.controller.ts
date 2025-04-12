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

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard())
  @Post(':shelterId')
  createComment(
    @Req() req: Request,
    @Param('shelterId') shelterId: string,
    @Body() createCommentDto: { start: number; content: string },
  ) {
    return this.commentService.createComment(
      req['user'].id,
      shelterId,
      createCommentDto,
    );
  }

  @Get(':shelterId')
  getCommentsByShelter(@Param('shelterId') shelterId: string) {
    return this.commentService.getCommentsByShelter(shelterId);
  }
}
