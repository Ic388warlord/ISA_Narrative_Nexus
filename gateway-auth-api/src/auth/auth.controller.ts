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
import {
  LoginDto,
  LoginErrorResponseDto,
  LoginOkResponseDto,
} from "./dtos/login.dto";
import { Request, Response } from "express";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { StringService } from "src/util/util.service";
import { EndpointService } from "src/endpoint/endpoint.service";
import { HttpMethod } from "@prisma/client";
import { UserService } from "src/user/user.service";
import { loginForgotPass } from "./dtos/loginForgotPass.dto";
import { loginGetSendToResetPage } from "./dtos/loginGetSendToResetPage.dto";
import { LogoutErrorResponseDto, LogoutOkResponseDto } from "./dtos/logout.dto";
import { MeErrorResponseDto, MeOkResponseDto } from "./dtos/me.dto";

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
    type: LoginErrorResponseDto,
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
  @ApiOkResponse({
    description: "Sucessful signout",
    type: LogoutOkResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "JWT was not valid",
    type: LogoutErrorResponseDto,
  })
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
  @ApiOkResponse({ description: "Their user info", type: MeOkResponseDto })
  @ApiUnauthorizedResponse({
    description: "Invalid or blacklisted token",
    type: MeErrorResponseDto,
  })
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

  @ApiOperation({ 
    summary: "Sends password reset email if given email is valid" 
  })
  @ApiResponse({
    status: 200,
    description: "Successful, email has been sent to user's email"
  })
  @ApiResponse({
    status: 404,
    description: "Unsuccessful, email does not exist",
    type: loginForgotPass
  })
  @Public()
  @Get("forgotpassword/:email")
  forgotPassword(@Req() req: Request, @Param("email") email: string) {
    this.endpointService.updateEndpointCounter({
      method: HttpMethod[req.method],
      name: this.stringService.endpoint.FORGOT_PASSWORD_PATH,
    });

    return this.authService.forgotPassword(email);
  }

  @ApiOperation({
    summary: "Verifies token from password reset url"
  })
  @ApiResponse({
    status: 200,
    description: "Successful, token is valid and password can be reset"
  })
  @ApiResponse({
    status: 401,
    description: "Unsuccessful, token is invalid",
    type: loginGetSendToResetPage
  })
  @ApiUnauthorizedResponse({ 
    description: "Reset token expired" 
  })
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

  @ApiOperation({
    summary: "Reset user password in database"
  })
  @ApiResponse({
    status: 200,
    description: "Successful, password for user is updated in database"
  })
  @ApiResponse({
    status: 401,
    description: "Token expired"
  })
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
