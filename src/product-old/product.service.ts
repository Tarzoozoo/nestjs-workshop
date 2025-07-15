import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private readonly products = [
    {
      id: 1,
      name: 'Product1',
      describetion: 'Description1',
    },
    {
      id: 2,
      name: 'Product2',
      describetion: 'Description2',
    },
  ];

  getAll() {
    return this.products;
  }

  create(product) {
    this.products.push(product);
    return this.products;
  }
}
