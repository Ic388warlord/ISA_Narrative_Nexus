import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly userService;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UserService);
    login(email: string, password: string): Promise<string>;
    me(user: User): {
        id: number;
        email: string;
    };
}
