import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateJobDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    budget: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    level: string;


}
