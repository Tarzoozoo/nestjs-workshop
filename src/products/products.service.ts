import { Injectable, NotFoundException } from '@nestjs/common'; // Helper Function
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// Product = ต้นแบบของข้อมูล
// ProductDocument = ต้นแบบของmodel ที่ใช้สื่อสารกับข้อมูล

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const result = new this.productModel(createProductDto); // new สร้าง instance ใหม่ขึ้นมา
    const response = result.save();
    return response;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const result = this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
      })
      .exec();
    return result;
  }

  async remove(id: string) {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('id not found');
    }
    return { message: 'Delete successful' };
  }
}
