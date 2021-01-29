import { IsDate, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

export class CreateTimerDto {
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    readonly startedAt: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly endedAt?: Date;
}
