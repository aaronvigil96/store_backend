import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { UserRole } from "src/auth/enum/user-role.enum";

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService:CategoryService){}

    @Get()
    getAllCategories(){
        return this.categoryService.getAll();
    }

    @Get('/:id')
    getCategoryById(@Param('id', ParseIntPipe)id:number){
        return this.categoryService.getById(id);
    }

    @Post()
    @Auth(UserRole.ADMIN)
    createCategory(@Body()createCategoryDto:CreateCategoryDto){
        return this.categoryService.create(createCategoryDto);
    }

    @Patch('/:id')
    @Auth(UserRole.ADMIN)
    updateCategory(@Param('id', ParseIntPipe)id:number, @Body()updateCategoryDto:UpdateCategoryDto){
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete('/:id')
    @Auth(UserRole.ADMIN)
    deleteCategory(@Param('id', ParseIntPipe)id:number){
        return this.categoryService.delete(id);
    }
}