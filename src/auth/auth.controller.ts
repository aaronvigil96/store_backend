import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./decorators/get-user.decorator";
import { UserRoleGuard } from "./guards/user-role.guard";
import { RoleProtected } from "./decorators/role-protected.decorator";
import { UserRole } from "./enum/user-role.enum";
import { Auth } from "./decorators/auth.decorator";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body()createUserDto:CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body()loginUserDto:LoginUserDto){
        return this.authService.login(loginUserDto);
    }

    @Get('private')
    @Auth(UserRole.ADMIN)
    privateRoute(){

    }
}