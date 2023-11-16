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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(jwtService, configService, userService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
    }
    async login(email, password) {
        const user = await this.userService.findUser(email);
        if (!user)
            throw new common_1.UnauthorizedException("User does not exist");
        const isValid = (0, bcrypt_1.compareSync)(password, user.hash);
        if (!isValid)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const token = this.jwtService.signAsync(user, {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: this.configService.get("JWT_TOKEN_EXPIRATION"),
        });
        return token;
    }
    me(user) {
        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map