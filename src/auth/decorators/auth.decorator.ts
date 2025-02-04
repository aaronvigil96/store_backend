import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { UserRole } from "../enum/user-role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";

export function Auth(...roles:UserRole[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}