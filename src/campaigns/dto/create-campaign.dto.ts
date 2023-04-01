import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  ecopoints: number;

  @IsArray()
  tasks: Mission[];

  @IsString()
  @IsNotEmpty()
  termsConditions: string;

  @IsNumber()
  @IsNotEmpty()
  resetEvery: number;
}

class Mission {
  @IsNumber()
  order: number;

  @IsString()
  name: string;

  @IsBoolean()
  requireProof: boolean;
}
