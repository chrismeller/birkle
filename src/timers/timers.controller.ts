import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Response } from '@nestjs/common';
import { TimersService } from './timers.service';
import { CreateTimerDto } from './dto/create-timer.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';
import { EndTimerDto } from './dto/end-timer.dto';
import { AuthGuard } from '@nestjs/passport';
import { v4 as uuidv4 } from 'uuid';

@Controller('timers')
export class TimersController {
  constructor(private readonly timersService: TimersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async create(@Request() req, @Response() res, @Body() createTimerDto: CreateTimerDto) {
    // we always generate a new ID and grab the user ID from the JWT authentication
    const id = uuidv4();
    const userId = req.user.id;
  
    if (createTimerDto.endedAt <= createTimerDto.startedAt) {
      return res.status(400).send({ statusCode: 400, message: 'End date must be > Start date.'});
    }

    // check to ensure that this time log would not overlap an existing one for the user
    // we do this in two checks just to simplify the logic
    // as what i assume is an intended, though unspecified, consequence, this means you may not have more than one ongoing task
    if (await this.timersService.wouldOverlap(userId, createTimerDto.startedAt) || 
      (createTimerDto.endedAt != null && await this.timersService.wouldOverlap(userId, createTimerDto.endedAt))) {
        return res.status(400).send({ statusCode: 400, message: 'Timers must not overlap!' });
    }

    const result = await this.timersService.create(id, userId, createTimerDto);

    return res.status(201).send({ statusCode: 201, message: result });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async findAll(@Request() req) {
    const userId = req.user.id;

    return await this.timersService.findAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public async findOne(@Request() req, @Response() res, @Param('id') id: string) {
    const userId = req.user.id;

    const existing = await this.timersService.findOne(id);

    if (existing == null) {
      return res.status(404).send({ statusCode: 404, message: 'Timer not found.' });
    }

    if (existing.UserId !== userId) {
      return res.status(401).send({ statusCode: 401, message: 'Unauthorized.' });
    }

    return res.status(200).send(existing);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  public async update(@Request() req, @Response() res, @Param('id') id: string, @Body() updateTimerDto: UpdateTimerDto) {
    const userId = req.user.id;

    const existing = await this.timersService.findOne(id);

    if (existing == null) {
      return res.status(404).send({ statusCode: 404, message: 'Timer not found.' });
    }

    if (existing.UserId !== userId) {
      return res.status(401).send({ statusCode: 401, message: 'Unauthorized.' });
    }

    // finally, a user cannot edit an ongoing time entry
    if (existing.EndedAt == null) {
      return res.status(400).send({ statusCode: 400, message: 'Timer is ongoing. End it first.'});
    }

    if (updateTimerDto.endedAt <= updateTimerDto.startedAt) {
      return res.status(400).send({ statusCode: 400, message: 'End date must be > Start date.'});
    }

    // if you would overlap another timer with your update, we'll also kick you back
    if (await this.timersService.wouldOverlap(userId, updateTimerDto.startedAt, id) || await this.timersService.wouldOverlap(userId, updateTimerDto.endedAt, id)) {
        return res.status(400).send({ statusCode: 400, message: 'Timers must not overlap!' });
    }

    this.timersService.update(id, updateTimerDto);

    return res.status(200).send({ statusCode: 200, message: 'Updated.' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  public async remove(@Request() req, @Response() res, @Param('id') id: string) {
    const userId = req.user.id;

    const existing = await this.timersService.findOne(id);

    if (existing == null) {
      return res.status(404).send({ statusCode: 404, message: 'Timer not found.' });
    }

    if (existing.UserId !== userId) {
      return res.status(401).send({ statusCode: 401, message: 'Unauthorized.' });
    }

    await this.timersService.remove(id);

    return res.status(200).send({ statusCode: 200, message: 'Deleted.' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/end')
  public async end(@Request() req, @Response() res, @Param('id') id: string, @Body() endTimerDto: EndTimerDto) {
    const userId = req.user.id;

    const existing = await this.timersService.findOne(id);

    if (existing == null) {
      return res.status(404).send({ statusCode: 404, message: 'Timer not found.' });
    }

    if (existing.UserId !== userId) {
      return res.status(401).send({ statusCode: 401, message: 'Unauthorized.' });
    }

    if (endTimerDto.endedAt <= existing.StartedAt) {
      return res.status(400).send({ statusCode: 400, message: 'End date must be > Start date.'});
    }

    this.timersService.end(id, endTimerDto);

    return res.status(200).send({ statusCode: 200, message: 'Ended.'});
  }
}
