import { ApiProperty } from '@nestjs/swagger';

export class loginPostBodySendToResetPage {
  @ApiProperty({ type: 'string', default: 'Password', description: 'New user password' })
  password: string;

  @ApiProperty({ type: 'string', default: 'Password', description: 'Reconfirm new user password' })
  confirmPassword: string;
}
