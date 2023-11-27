import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class loginPostBodySendToResetPage {
  @ApiProperty({ type: 'string', default: 'Password', description: 'New user password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: 'string', default: 'Password', description: 'Reconfirm new user password' })
  @IsNotEmpty()
  confirmPassword: string;
}
