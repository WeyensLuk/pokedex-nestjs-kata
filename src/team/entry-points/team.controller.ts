import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Team } from '../domain/team.entity';
import { TeamService } from '../domain/team.service';
import { TeamDto } from './team.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../authentication/authentication.guard';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @UseGuards(AuthenticationGuard)
  @ApiOkResponse({ description: 'All teams', type: Team, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  @ApiOkResponse({ description: 'Team found', type: Team })
  @ApiNotFoundResponse({ description: 'Team not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @ApiCreatedResponse({ description: 'Team created', type: Team })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(@Body() team: TeamDto): Promise<Team> {
    return this.teamService.create(team);
  }

  @Put(':id')
  @UseGuards(AuthenticationGuard)
  @ApiNotFoundResponse({ description: 'Team not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async setPokemonsOnTeam(
    @Param('id') id: number,
    @Body() pokemons: number[],
  ): Promise<Team> {
    this.validateNumberOfPokemon(pokemons);

    return this.teamService.setPokemonsOnTeam(id, pokemons);
  }

  validateNumberOfPokemon(pokemons: number[]) {
    if (pokemons.length > 6) {
      throw new BadRequestException('A team can have at most 6 pokemon.');
    }
  }
}
