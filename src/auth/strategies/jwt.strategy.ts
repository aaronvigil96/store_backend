import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly prismaService:PrismaService,
        configService:ConfigService
    ){
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload){
        const {id} = payload;
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        });
        if(!user) throw new UnauthorizedException('Token not valid');
        if(!user) throw new UnauthorizedException('User is inactive, talking with an admin');
        return user;
    }
}