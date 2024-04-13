import { Controller, Get } from '@nestjs/common';
import { Pokemon } from '../domain/pokemon.entity';

@Controller()
export class PokemonController {
  constructor() {}

  @Get()
  findAll(): Pokemon[] {
    return [] as Pokemon[];
  }
}
