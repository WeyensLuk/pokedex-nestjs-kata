import { Controller, Get, Query } from '@nestjs/common';
import { Pokemon } from '../domain/pokemon.entity';
import { PokemonService } from '../domain/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(@Query() query?): Promise<Pokemon[]> {
    return this.pokemonService.findAll(query);
  }
}
