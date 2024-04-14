import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Team } from '../domain/team.entity';
import { TeamService } from '../domain/team.service';
import { TeamDto } from './team.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Team not found' })
  async findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Team created', type: Team })
  async create(@Body() team: TeamDto): Promise<Team> {
    return this.teamService.create(team);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Team not found' })
  async setPokemonsOnTeam(
    @Param('id') id: number,
    @Body() pokemons: number[],
  ): Promise<Team> {
    validateNumberOfPokemon(pokemons);

    return this.teamService.setPokemonsOnTeam(id, pokemons);
  }
}
function validateNumberOfPokemon(pokemons: number[]) {
  if (pokemons.length > 6) {
    throw new BadRequestException('A team can have at most 6 pokemon.');
  }
}
