import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { RegisterDto } from "./dtos/register.dto";
import { Public } from "src/auth/auth.metadata";
import { ApiTags } from "@nestjs/swagger";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";

@ApiTags("User")
@Controller({
  path: "user",
  version: "1",
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly endpointService: EndpointService,
  ) {}

  @Public()
  @Post("register")
  register(@Req() req: Request, @Body() registerDto: RegisterDto) {
    console.log(registerDto);

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    return this.userService.createUser(registerDto);
  }

  @Get("getallusers")
  async getAllUsers(@Req() req: Request) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    return this.userService.getAllUsers();
  }
}
