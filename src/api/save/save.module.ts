import {Module} from "@nestjs/common";
import {SaveController} from "./save.controller";
import {SaveService} from "./save.service";
import {PrismaService} from "../../database/prisma.service";

@Module({
  imports: [],
  controllers: [SaveController],
  providers: [SaveService,PrismaService],
  exports: [SaveService],
})

export class SaveModule {}