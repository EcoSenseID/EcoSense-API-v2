import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRewardCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
