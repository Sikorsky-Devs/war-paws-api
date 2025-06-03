import { AccountType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  firstName?: string;

  middleName?: string;

  lastName?: string;

  name?: string;

  @IsNotEmpty({ message: 'Account type is required' })
  @IsEnum(AccountType, { message: 'Invalid account type' })
  accountType: AccountType;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
