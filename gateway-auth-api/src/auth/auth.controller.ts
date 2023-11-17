import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./auth.metadata";
import { LoginDto } from "./dtos/login.dto";
import { Request, Response } from "express";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    res.cookie("token", token, {
      path: "/api",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 3600 * 24 * 1000,
    });
    return { message: "Login successful" };
  }

  @Get("logout")
  async logout(@Req() req: Request) {
    await this.authService.logout(req.cookies.token);
    return { message: "Successful sign out" };
  }

  @Get("me")
  me(@Req() req: Request) {
    return this.authService.me(req["user"]);
  }
}
