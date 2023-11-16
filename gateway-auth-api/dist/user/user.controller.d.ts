import { UserService } from "./user.service";
import { RegisterDto } from "./dtos/register.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
    }>;
}
