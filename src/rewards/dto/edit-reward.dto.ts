import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CategoryDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class EditRewardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  partner: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @IsString()
  @IsNotEmpty()
  validUntil: string;

  @IsNumber()
  @IsNotEmpty()
  ecopoints: number;

  @IsArray()
  termsConditions: string[];

  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsArray()
  howToUse: string[];

  @IsNumber()
  @IsNotEmpty()
  maxRedeem: number;
}
