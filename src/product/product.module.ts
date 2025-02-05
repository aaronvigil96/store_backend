import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {

}