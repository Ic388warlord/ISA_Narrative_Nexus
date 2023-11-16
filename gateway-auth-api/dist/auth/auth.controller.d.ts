import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { Request } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<string>;
    me(req: Request): {
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    };
}
