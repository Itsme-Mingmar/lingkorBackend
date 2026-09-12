import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";

import { SpaceType } from "../../entities/space.entity";

export class UpdateSpaceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsEnum(SpaceType)
  type?: SpaceType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  category?: string;
}