import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRewardCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
