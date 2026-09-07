import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email invalid' })
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}