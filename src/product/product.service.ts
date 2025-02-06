import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {

    private readonly logger = new Logger('ProductService', {timestamp: true});

    constructor(private readonly prismaService:PrismaService){}

    async getAll(){
        this.logger.log('getAll')
        return await this.prismaService.product.findMany({
            where: {
                isActive: true
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    }

    async getById(id:number){
        this.logger.log('getById')
        const product = await this.prismaService.product.findUnique({
            where: {
                id,
                isActive: true
            }
        });
        if(!product) throw new NotFoundException("This product doesn't exist");
        return product;
    }

    async create(createProductDto:CreateProductDto){
        this.logger.log('create')
        try{
            await this.prismaService.product.create({
                data: {
                    ...createProductDto
                }
            })
        }catch(err){
            if(err.code === "P2003") throw new ConflictException("This category doesn't exist");
            if(err.code === 'P2002')throw new ConflictException('That product is already created')
            throw err;
        }
    }

    async update(id:number, updateProductDto:UpdateProductDto){
        this.logger.log('update')
        try{
            const product = await this.prismaService.product.update({
                where: {
                    id,
                    isActive: true
                },
                data: {
                    ...updateProductDto
                }
            })
            return product;
        }catch(err){
            if(err.code === 'P2025') throw new ConflictException("This product doesn't exist")
            throw err;
        }
    }

    async delete(id: number){
        this.logger.log('delete')
        try{
            await this.prismaService.product.update({
                where: {
                    id,
                    isActive: true
                },
                data: {
                    isActive: false
                }
            });
        }catch(err){
            if(err.code === 'P2025') throw new ConflictException("This product doesn't exist")
            console.log(err);
        }
    }

}