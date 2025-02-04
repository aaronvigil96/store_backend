import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { comparePassword, hashPassword } from "./utils/handlePassword.util";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "./enum/user-role.enum";

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService', {timestamp: true});

    constructor(
        private readonly prismaService:PrismaService,
        private readonly jwtService:JwtService
    ){}

    async register(createUserDto:CreateUserDto){
        this.logger.log('register');
        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    password: hashPassword(createUserDto.password)
                }
            });
            this.logger.log('User created');
            return {
                token: this.getJwtToken({id: user.id})
            }
        }catch(err){
            this.logger.error('register error');
            if(err.code === "P2002") {
                this.logger.error('Email is already registered');
                throw new ConflictException('Email is already registered')
            }
            throw err;
        }
        
    }

    async login({email, password}:LoginUserDto){
        this.logger.log('login')
        try{
            const user = await this.prismaService.user.findUnique({
                where: {
                    email,
                    isActive: true
                }
            });
            if(!user) throw new NotFoundException('That email does not exist');
            if(!comparePassword(password, user.password)) throw new UnauthorizedException('Password incorrect');
            delete user.password;
            return { 
                token: this.getJwtToken({id: user.id})
            }
        }catch(err){
            this.logger.error('login error');
            this.logger.error(err);
            throw err;
        }
    }

    private getJwtToken(payload: JwtPayload){
        const token = this.jwtService.sign(payload);
        return token;
    }
}