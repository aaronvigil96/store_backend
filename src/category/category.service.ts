import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {

    private readonly logger = new Logger('CategoryService', {timestamp: true});

    constructor(
        private readonly prismaService:PrismaService,
    ){}

    async getAll(){
        this.logger.log('getAll');
        return await this.prismaService.category.findMany({
            where: {
                isActive: true
            }
        })
    }

    async getById(id:number){
        this.logger.log('getById');
        const category = await this.prismaService.category.findUnique({
            where: {
                id,
                isActive: true
            }
        });
        if(!category) throw new NotFoundException("This category doesn't exist");
        return category;
    }

    async create(createCategory:CreateCategoryDto){
        this.logger.log('create');
        try{
            const category = await this.prismaService.category.create({
                data: {
                    ...createCategory
                }
            });
            return category;
        }catch(err){
            throw new ConflictException('That category is already created')
        }
    }

    async update(id:number, updateCategoryDto:UpdateCategoryDto){
        this.logger.log('update');
        try{
            const category = await this.prismaService.category.update({
                where: {
                    id,
                    isActive: true
                },
                data: {
                    ...updateCategoryDto
                }
            });
            return category;
        }catch(err){
            throw new ConflictException('That category is already created')
        }
    }

    async delete(id: number){
        this.logger.log('delete');
        try{
            await this.prismaService.category.update({
                where: {
                    id,
                    isActive: true
                },
                data: {
                    isActive: false
                }
            })
        }catch(err){
            if(err.code === 'P2025') throw new ConflictException("This category doesn't exist")
            throw err;
        }
    }
}