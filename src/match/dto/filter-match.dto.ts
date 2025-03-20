import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterMatchDto {
  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value)) // Convert string to number
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
