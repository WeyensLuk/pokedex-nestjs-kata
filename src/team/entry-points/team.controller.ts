import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Team } from '../domain/team.entity';
import { TeamService } from '../domain/team.service';
import { TeamDto } from './team.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Post()
  async create(@Body() team: TeamDto): Promise<Team> {
    return this.teamService.create(team);
  }

  @Put(':id')
  async setPokemonsOnTeam(
    @Param('id') id: number,
    @Body() pokemons: number[],
  ): Promise<Team> {
    return this.teamService.setPokemonsOnTeam(id, pokemons);
  }
}
