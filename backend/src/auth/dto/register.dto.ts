import { IsEmail, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsOptional()
    fullName: string;

    @IsEnum(UserRole)
    role: UserRole;
}
