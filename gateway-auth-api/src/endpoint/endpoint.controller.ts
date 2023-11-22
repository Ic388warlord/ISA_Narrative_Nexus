import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EndPointDto } from "./dtos/endpoint.dto";
import { EndpointService } from "./endpoint.service";
import { StringService } from "src/util/util.service";

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
}
