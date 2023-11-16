import { SetMetadata } from "@nestjs/common";

export const PublicKey = "isPublic";
export const Public = () => SetMetadata(PublicKey, true);

export const RolesKey = "roles";
export const Roles = (...roles: string[]) => SetMetadata(RolesKey, roles);
