"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.RolesKey = exports.Public = exports.PublicKey = void 0;
const common_1 = require("@nestjs/common");
exports.PublicKey = "isPublic";
const Public = () => (0, common_1.SetMetadata)(exports.PublicKey, true);
exports.Public = Public;
exports.RolesKey = "roles";
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.RolesKey, roles);
exports.Roles = Roles;
//# sourceMappingURL=auth.metadata.js.map