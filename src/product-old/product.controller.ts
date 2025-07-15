import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {
  // Injection ProductService
  constructor(private readonly productService: ProductService) {}
  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Post()
  addProduct(@Body() product) {
    return this.productService.create(product);
  }
}
