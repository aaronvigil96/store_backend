import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: ( configService:ConfigService ) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get<string>('JWT_EXPIRATION')
                    }
                }  
            }
        })
    ],
    exports: [JwtStrategy, PassportModule, JwtModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {

}