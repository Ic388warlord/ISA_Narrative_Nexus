import { ApiProperty } from '@nestjs/swagger';

export class loginGetSendToResetPage {
  @ApiProperty({ type: 'string', default: 'Invalid token', description: 'Reason for error' })
  message: string;

  @ApiProperty({ type: 'string', default: 'Unauthorized', description: 'Error message' })
  error: string;

  @ApiProperty({ type: 'number', default: 401, description: 'Http error code' })
  statusCode: number;
}
