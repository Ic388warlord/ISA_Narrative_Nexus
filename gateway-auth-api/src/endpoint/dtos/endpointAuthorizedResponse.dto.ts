import { ApiProperty } from '@nestjs/swagger';

export class endpointAuthorizedResponse {
  @ApiProperty({ type: 'Number', default: 1, description: 'Id of the endpoint' })
  id: Number;

  @ApiProperty({ type: 'string', default: 'GET', description: 'Http method' })
  method: string;

  @ApiProperty({ type: 'string', default: '/api/v1/auth/logout', description: 'Name of the endpoint' })
  name: string;

  @ApiProperty({ type: 'Number', default: 69, description: 'Number of times endpoint accessed'})
  count: Number;
}
