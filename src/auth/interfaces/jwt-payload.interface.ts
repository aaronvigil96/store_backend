import { UserRole } from "../enum/user-role.enum";

export interface JwtPayload {
    id: number;
    role: UserRole;
}