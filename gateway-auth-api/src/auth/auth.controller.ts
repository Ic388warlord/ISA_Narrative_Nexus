import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.metadata";
import { LoginDto } from "./dtos/login.dto";
import { Request, Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StringService } from "src/util/util.service";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";

@ApiTags("Authentication")
@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly stringService: StringService,
    private readonly endpointService: EndpointService,
  ) {}

  @ApiOperation({
    summary:
      "Login in user with email, username, and password. Creates a cookie on client side when successful",
  })
  @ApiResponse({
    status: 200,
    description: "Successful login, creates a cookie on client side",
  })
  @ApiResponse({ status: 403, description: "Invalid login credentials" })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Req() req: Request,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.path);
    console.log(req.method);
    const token = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    res.cookie("token", token, {
      path: "/api",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 3600 * 24 * 1000,
    });
    return { message: this.stringService.auth.LOGIN_OK };
  }

  @Get("logout")
  async logout(@Req() req: Request) {
    await this.authService.logout(req.cookies.token);
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    return { message: this.stringService.auth.LOGOUT_OK };
  }

  @Get("me")
  me(@Req() req: Request) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });
    return this.authService.me(req["user"]);
  }

  @Public()
  @Get("forgotpassword/:email")
  forgotPassword(@Req() req: Request, @Param("email") email: string) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });
    return this.authService.forgotPassword(email);
  }

  @Public()
  @Get("reset")
  @Render("index")
  sendToResetPage(@Req() req: Request, @Query("token") token: string) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });
    return this.authService.verifyResetToken(token);
  }

  @Public()
  @Post("reset")
  @Render("index")
  resetPassword(
    @Req() req: Request,
    @Query("token") token: string,
    @Body() body,
  ) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    console.log(token);
    console.log(body);
    return this.authService.resetPassword(
      token,
      body.password,
      body.confirmPassword,
    );
  }
}
