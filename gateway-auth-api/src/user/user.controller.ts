import { Body, Controller, Get, Post, Req, Param, Patch } from "@nestjs/common";
import { Request } from "express";
import { UserService } from "./user.service";
import { RegisterDto } from "./dtos/register.dto";
import { Public } from "src/auth/auth.metadata";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";
import { RequestCountDto } from "./dtos/requestCount.dto";
import { StringService } from "src/util/util.service";
import { RegisterResponseDto } from "./dtos/registerResponse.dto";
import { RegisterResponseErrorDto } from "./dtos/registerResponseError.dto";
import { allUserData } from "./dtos/allUserData.dto";
import { AllUserDataError } from "./dtos/allUserDataError.dto";
import { UserTotalRequestDto } from "./dtos/userTotalRequest.dto";
import { UserTotalRequestErrorDto } from "./dtos/userTotalRequestError.dto";
import { AllUserRequestDto } from "./dtos/allUserRequest.dto";
import { ChangeRoleDto, ChangeRoleOkResponseDto } from "./dtos/changerole.dto";

@ApiTags("User")
@Controller({
  path: "user",
  version: "1",
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly endpointService: EndpointService,
    private readonly stringService: StringService,
  ) {}

  @Public()
  @Post("register")
  @ApiCreatedResponse({
    description: "Successfully registered a new user",
    // eslint-disable-next-line @typescript-eslint/ban-types
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Failed to register a new user",
    type: RegisterResponseErrorDto,
  })
  register(@Req() req: Request, @Body() registerDto: RegisterDto) {
    console.log(registerDto);

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    return this.userService.createUser(registerDto);
  }

  @Get("getallusers")
  @ApiCreatedResponse({
    description: "Successfuly get a json object that contains all user's data",
    type: allUserData,
  })
  @ApiBadRequestResponse({
    description: "Failed to get the users data",
    type: AllUserDataError,
  })
  async getAllUsers(@Req() req: Request) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.userService.getAllUsers();
  }

  async updateRequestCounter(
    @Body() requestCountDto: RequestCountDto,
  ): Promise<any> {
    return this.userService.updateRequestCounter(requestCountDto);
  }

  @Get("usertotalrequest/:username")
  @ApiCreatedResponse({
    description:
      "Successfuly get a json object that contains all user total request with all the api",
    type: UserTotalRequestDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid username/ no such username",
    type: UserTotalRequestErrorDto,
  })
  async userTotalRequest(
    @Req() req: Request,
    @Param("username") username: string,
  ): Promise<any> {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: this.stringService.endpoint.USER_TOTAL_REQUEST_PATH,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.userService.userTotalRequest(username);
  }

  @Get("allusertotalrequest")
  @ApiCreatedResponse({
    description: "Successfuly get all user request count information",
    type: AllUserRequestDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid endpoint",
    type: AllUserDataError,
  })
  async allUserTotalRequest(@Req() req: Request): Promise<any> {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.userService.allUserTotalRequest();
  }

  @ApiOkResponse({
    description: "Role was changed successfully",
    type: ChangeRoleOkResponseDto,
  })
  @Patch("changerole")
  @ApiCreatedResponse({
    description: "Successfully change the role of a user",
  })
  @ApiBadRequestResponse({
    description: "Failed to change role of a user",
  })
  changeRole(@Req() req: Request, @Body() changeRoleDto: ChangeRoleDto) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.userService.changeRole(changeRoleDto);
  }

  @Get("overusage")
  overUsage(@Req() req: Request) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.userService.overUsage(req["user"].username);
  }
}
