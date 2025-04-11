import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PetModule } from './api/pet/pet.module';
import { ContactModule } from './api/contact/contact.module';

@Module({
  imports: [AuthModule, UserModule, PetModule, ContactModule],
})
export class AppModule {}
