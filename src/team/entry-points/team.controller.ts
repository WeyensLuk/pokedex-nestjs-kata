import { Body, Controller, Get, Post } from '@nestjs/common';
import { Team } from '../domain/team.entity';
import { TeamService } from '../domain/team.service';
import { TeamDto } from './team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Post()
  async create(@Body() team: TeamDto): Promise<Team> {
    return this.teamService.create(team);
  }
}
