import { IsString, IsNumber, IsOptional } from 'class-validator'; // Decorator

export class CreateProductDto {
  @IsString() // ตรวจสอบว่าเป็น string ไหม
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  readonly price: number;
}
