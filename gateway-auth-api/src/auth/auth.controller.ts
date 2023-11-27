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
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.metadata";
import { LoginDto, LoginOkResponseDto } from "./dtos/login.dto";
import { Request, Response } from "express";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { StringService } from "src/util/util.service";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";
import { UserService } from "src/user/user.service";

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
    private readonly userService: UserService,
  ) {}
  @ApiOperation({
    summary: "Login",
  })
  @ApiOkResponse({
    description: "Login was successful",
    type: LoginOkResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid login credententials or user not found",
    type: Object,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Req() req: Request,
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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

  @ApiCookieAuth()
  @ApiOperation({
    summary: "Logout",
  })
  @ApiOkResponse({ description: "Sucessful signout" })
  @ApiUnauthorizedResponse({ description: "JWT was not valid" })
  @Get("logout")
  async logout(@Req() req: Request) {
    await this.authService.logout(req.cookies.token);

    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return { message: this.stringService.auth.LOGOUT_OK };
  }

  @ApiCookieAuth()
  @ApiOperation({ summary: "Get logged in user's info" })
  @ApiOkResponse({ description: "Their user info" })
  @Get("me")
  me(@Req() req: Request) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: req.path,
    });

    this.userService.updateRequestCounter({
      username: req["user"].username,
    });

    return this.authService.me(req["user"]);
  }

  @ApiOperation({ summary: "Send email for forget password" })
  @ApiOkResponse({ description: "Sucessfully sent the email" })
  @ApiBadRequestResponse({ description: "User does not exist" })
  @Public()
  @Get("forgotpassword/:email")
  forgotPassword(@Req() req: Request, @Param("email") email: string) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: this.stringService.endpoint.FORGOT_PASSWORD_PATH,
    });

    return this.authService.forgotPassword(email);
  }

  @ApiOperation({ summary: "Go to reset password page" })
  @ApiOkResponse({ description: "On the page" })
  @ApiUnauthorizedResponse({ description: "Reset token expired" })
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

  @ApiOperation({ summary: "Resets the user's password" })
  @ApiOkResponse({ description: "Password was reset" })
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
