import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PetModule } from './api/pet/pet.module';
import { ContactModule } from './api/contact/contact.module';
import { SearchRequestModule } from './api/search-request/search-request.module';
import { SaveModule } from './api/save/save.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PetModule,
    ContactModule,
    SearchRequestModule,
    SaveModule,
  ],
})
export class AppModule {}
