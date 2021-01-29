import { Injectable, Logger } from '@nestjs/common';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';
import { EndTimerDto } from './dto/end-timer.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class TimersService {
  private readonly logger = new Logger(TimersService.name);

  constructor(private readonly db: DbService) {}

  public async create(id: string, userId: string, createTimerDto: CreateTimerDto) {
    return await this.db.timer.create({
      data: {
        Id: id,
        UserId: userId,
        Description: createTimerDto.description,
        StartedAt: createTimerDto.startedAt,
        EndedAt: createTimerDto.endedAt,
      }
    });
  }

  public async findAll(userId: string) {
    return await this.db.timer.findMany({
      where: {
        UserId: userId,
      }
    });
  }

  public async findOne(id: string) {
    return await this.db.timer.findUnique({
      where: {
        Id: id,
      }
    });
  }

  public async update(id: string, updateTimerDto: UpdateTimerDto) {
    return await this.db.timer.update({
      data: {
        Description: updateTimerDto.description,
        EndedAt: updateTimerDto.endedAt,
        StartedAt: updateTimerDto.startedAt,
      },
      where: {
        Id: id,
      }
    });
  }

  public async remove(id: string) {
    await this.db.timer.delete({
      where: {
        Id: id,
      }
    });

    this.logger.debug(`Removed ${id}`);

    return true;
  }

  public async wouldOverlap(userId: string, date: Date, id?: string) {
    // stupid ORM, this is why I don't use them. let's just use sql...

    // we slightly switch the logic if this is an update, otherwise we would match with the timer we're updating
    let result: any = null;
    if (id == null) {
      result = await this.db.$queryRaw('select count(*) as c from Timer where UserId = ? and StartedAt <= ? and (EndedAt is null or EndedAt >= ?)', userId, date, date);
    }
    else {
      result = await this.db.$queryRaw('select count(*) as c from Timer where UserId = ? and StartedAt <= ? and (EndedAt is null or EndedAt >= ?) and Id != ?', userId, date, date, id);
    }
    console.log(result);
    if (result[0].c != 0) {
      return true;
    }

    return false;
  }

  public async end(id: string, endTimerDto: EndTimerDto) {
    return await this.db.timer.update({
      data: {
        EndedAt: endTimerDto.endedAt,
      },
      where: {
        Id: id,
      }
    });
  }
}
