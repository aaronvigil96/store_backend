import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('product')
export class ProductController {

    constructor(private readonly productService:ProductService){}

    @Get()
    getAllProducts(){
        return this.productService.getAll();
    }

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe)id:number){
        return this.productService.getById(id);
    }

    @Post()
    createProduct(@Body()createProductDto:CreateProductDto){
        return this.productService.create(createProductDto);
    }

    @Patch('/:id')
    updateProduct(@Param('id', ParseIntPipe)id:number, @Body()updateProductDto:UpdateProductDto){
        return this.productService.update(id, updateProductDto);
    }

    @Delete('/:id')
    deleteProduct(@Param('id', ParseIntPipe)id:number){
        return this.productService.delete(id);
    }
}