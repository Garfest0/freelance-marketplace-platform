import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProposalDto {
    @IsNotEmpty()
    @IsNumber()
    jobId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;



    @IsNotEmpty()
    @IsString()
    coverLetter: string;
}
