"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    async findUser(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email: email },
        });
        return user;
    }
    async createUser(registerDto) {
        const salt = (0, bcrypt_1.genSaltSync)(parseInt(this.configService.get("SALT_ROUNDS")));
        const hash = (0, bcrypt_1.hashSync)(registerDto.password, salt);
        try {
            const newUser = await this.prismaService.user.create({
                data: {
                    email: registerDto.email,
                    hash: hash,
                },
            });
            return {
                id: newUser.id,
                email: newUser.email,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("User already exists");
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map