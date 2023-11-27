import { ApiProperty } from '@nestjs/swagger';

export class loginForgotPass {
  @ApiProperty({ type: 'string', default: 'Email does not exist', description: 'Reason for error' })
  message: string;

  @ApiProperty({ type: 'string', default: 'Not Found', description: 'Error message' })
  error: string;

  @ApiProperty({ type: 'number', default: 404, description: 'Http error code' })
  statusCode: number;
}
