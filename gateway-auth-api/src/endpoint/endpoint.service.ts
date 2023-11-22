import { PrismaService } from "src/prisma/prisma.service";
import { EndPointDto } from "./dtos/endpoint.dto";
import { Injectable } from "@nestjs/common";
import { StringService } from "src/util/util.service";

@Injectable()
export class EndpointService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stringService: StringService,
  ) {}

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
      throw new Error(this.stringService.endpoint.UPSERT_ERROR);
    }
  }

  async getEndpointsInfo() {
    try {
      const endpoints = await this.prismaService.endpoint.findMany();
      return endpoints;
    } catch (error) {
      console.error(this.stringService.endpoint.QUERY_ERROR, error);
      throw new Error(this.stringService.endpoint.QUERY_ERROR);
    }
  }
}
