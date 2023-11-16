import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dtos/register.dto";
export declare class UserService {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    findUser(email: string): Promise<{
        id: number;
        role: import(".prisma/client").$Enums.Role;
        email: string;
        hash: string;
    }>;
    createUser(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
    }>;
}
