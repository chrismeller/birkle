import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';


export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly firstname: string;

    @IsNotEmpty()
    readonly surname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}