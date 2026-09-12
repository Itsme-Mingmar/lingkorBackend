import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class LoginTeamDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}