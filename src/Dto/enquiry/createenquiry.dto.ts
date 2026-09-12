import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  IsDateString,
} from "class-validator";

export class CreateEnquiryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsInt()
  @Min(1)
  guests: number;

  @IsString()
  @IsOptional()
  message?: string;
}