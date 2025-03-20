import { IsMongoId, IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsMongoId()
  @IsNotEmpty()
  expertId: string;

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;  

  @IsOptional()  //  Specialization is optional
  @IsString()    //  Must be a string if provided
  specialization?: string;  
}
