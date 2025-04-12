import {Module} from "@nestjs/common";
import {CommentController} from "./comment.controller";
import {CommentService} from "./comment.service";
import {PrismaService} from "../../database/prisma.service";

@Module({
  controllers: [CommentController],
  imports: [],
  providers: [CommentService, PrismaService],
  exports: [CommentService],
})

export class CommentModule {}