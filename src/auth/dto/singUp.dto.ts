import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpDto {
    @IsString()
    @MinLength(3, { message: 'Username-ul trebuie sa aiba minim 3 caractere' })
    @MaxLength(15)
    username: string;

    @IsEmail({}, { message: 'Email invalid' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Parola trebuie sa aiba minim 6 caractere' })
    password: string;
}