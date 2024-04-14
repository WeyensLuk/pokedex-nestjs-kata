import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { IPokemon } from '../domain/pokemon.entity';
import { PokemonService } from '../domain/pokemon.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(@Query() query?): Promise<IPokemon[]> {
    this.validateQueryParameters(query);
    return this.pokemonService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<IPokemon> {
    return this.pokemonService.findOne(id);
  }

  private validateQueryParameters(query: any) {
    if (!query) return;
    if (query.sortDirection && !['asc', 'desc'].includes(query.sortDirection))
      throw new BadRequestException(
        'Invalid sortDirection. Must be either "asc" or "desc"',
      );
    if (query.sortBy && !['name', 'id'].includes(query.sortBy))
      throw new BadRequestException(
        'Invalid sortBy field. Must be either "name" or "id"',
      );
  }
}
