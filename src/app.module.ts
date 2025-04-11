import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PetModule } from './api/pet/pet.module';

@Module({
  imports: [AuthModule, UserModule, PetModule],
})
export class AppModule {}
