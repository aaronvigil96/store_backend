import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { UserRole } from "src/auth/enum/user-role.enum";

@Controller('product')
export class ProductController {

    constructor(private readonly productService:ProductService){}

    @Get('search')
    searchProduct(@Query('query')query:string){
        return this.productService.search(query);
    }

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe)id:number){
        return this.productService.getById(id);
    }

    @Get('/')
    getAllProducts(){
        return this.productService.getAll();
    }


    @Post()
    @Auth(UserRole.ADMIN)
    createProduct(@Body()createProductDto:CreateProductDto){
        return this.productService.create(createProductDto);
    }

    @Patch('/:id')
    @Auth(UserRole.ADMIN)
    updateProduct(@Param('id', ParseIntPipe)id:number, @Body()updateProductDto:UpdateProductDto){
        return this.productService.update(id, updateProductDto);
    }

    @Delete('/:id')
    @Auth(UserRole.ADMIN)
    deleteProduct(@Param('id', ParseIntPipe)id:number){
        return this.productService.delete(id);
    }
}