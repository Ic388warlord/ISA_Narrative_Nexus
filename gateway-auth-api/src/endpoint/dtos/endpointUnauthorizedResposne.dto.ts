import { ApiProperty } from '@nestjs/swagger';

export class endpointUnauthorizedResponse {
  @ApiProperty({ type: 'String', default: 'Invalid token', description: 'Reason for error' })
  message: String;

  @ApiProperty({ type: 'String', default: 'Unauthorized', description: 'Error message' })
  error: String;

  @ApiProperty({ type: 'Number', default: 401, description: 'HTTP status code' })
  statusCode: Number;
}
