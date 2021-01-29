import { Type } from "class-transformer";
import { IsNotEmpty, IsDate } from "class-validator";

export class EndTimerDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly endedAt: Date;
}