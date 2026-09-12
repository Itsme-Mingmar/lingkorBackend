import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
} from "class-validator";

export class CreateJournalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  quote: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  coverImage?: string;

  @IsDateString()
  @IsNotEmpty()
  publishedAt: string;

  @IsInt()
  @Min(1)
  readingTime: number;
}