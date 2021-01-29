import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { CreateTimerDto } from './create-timer.dto';

export class UpdateTimerDto extends PartialType(CreateTimerDto) {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    endedAt: Date
}
