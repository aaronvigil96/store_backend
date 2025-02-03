import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../enum/user-role.enum";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    password:string;
    @IsOptional()
    @IsEnum(UserRole,{ message: "role must be either USER or ADMIN"})
    role: UserRole   
}