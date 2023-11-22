import { PrismaService } from "src/prisma/prisma.service";
import { EndPointDto } from "./dtos/endpoint.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EndpointService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateEndpointCounter(endpointDto: EndPointDto) {
    try {
      await this.prismaService.endpoint.upsert({
        where: { name: endpointDto.name },
        create: {
          method: endpointDto.method,
          name: endpointDto.name,
          count: 1,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  }
}
