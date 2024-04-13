import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Pokemon } from '../domain/pokemon.entity';
import { PokemonService } from '../domain/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(@Query() query?): Promise<Pokemon[]> {
    this.validateQueryParameters(query);
    return this.pokemonService.findAll(query);
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
