import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  partner: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  ecopoints: number;

  @IsString()
  @IsNotEmpty()
  validUntil: string;

  @IsArray()
  termsConditions: string[];

  @IsString()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  maxRedeem: number;

  @IsArray()
  howToUse: string[];
}
