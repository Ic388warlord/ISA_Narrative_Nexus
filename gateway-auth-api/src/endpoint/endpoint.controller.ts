import { Body, Controller, Get, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EndPointDto } from "./dtos/endpoint.dto";
import { EndpointService } from "./endpoint.service";
import { StringService } from "src/util/util.service";
import { HttpMethod } from "@prisma/client";
import { Request } from "express";

@ApiTags("Endpoint")
@Controller({
  path: "endpoint",
  version: "1",
})
export class EndpointController {
  constructor(
    private endpointService: EndpointService,
    private readonly stringService: StringService,
  ) {}

  async updateEndpointCounter(@Body() endpointDto: EndPointDto): Promise<any> {
    console.log(this.stringService.story.LOG_DATA, endpointDto);
    return this.endpointService.updateEndpointCounter(endpointDto);
  }

  @Get("info")
  async getEndpointsInfo(@Req() req: Request): Promise<any> {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    return this.endpointService.getEndpointsInfo();
  }
}
