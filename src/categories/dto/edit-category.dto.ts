import { IsNotEmpty, IsString } from 'class-validator';

export class EditCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  photoUrl: string;

  @IsString()
  @IsNotEmpty()
  colorHex: string;
}
