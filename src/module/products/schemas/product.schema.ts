import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document; // Base structure ของ Document ใน Mongoose

// Add ความสามารถ schema ให้กับ Class Product ผ่าน decorator
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;
}

// Register to MongoDB
export const ProductSchema = SchemaFactory.createForClass(Product);
