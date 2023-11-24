import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepo : Repository<Product>

  ){}


  async createProduct(createProductDto: CreateProductDto) {
    const newproduct = await this.productRepo.create(createProductDto)
    await this.productRepo.save(newproduct)
    return newproduct
  }

  async getProducts() {
    return await this.productRepo.find()
  }

  async getProductById(id: string) {
    const foundproduct = await this.productRepo.findOneBy({id})
    if (foundproduct) return foundproduct
    throw new HttpException("ssss", HttpStatus.NOT_FOUND)
  }

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto)
    const updatedProduct = await this.productRepo.findOneBy({id})
    if (updatedProduct) return updatedProduct
    throw new HttpException("ssss", HttpStatus.NOT_FOUND)

  }

  async deleteProduct(id: string) {
    
    const deleteresponse = await this.productRepo.delete(id)
    if (!deleteresponse.affected) throw new HttpException("xxxx", HttpStatus.NOT_FOUND)
    return "deleted"
  }
}
