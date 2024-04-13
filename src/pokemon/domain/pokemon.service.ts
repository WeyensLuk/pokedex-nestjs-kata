import { InjectRepository } from '@mikro-orm/nestjs';
import { Pokemon } from './pokemon.entity';
import { EntityRepository } from '@mikro-orm/core';

export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly repository: EntityRepository<Pokemon>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return this.repository.findAll({
      populate: ['sprites.front_default', 'types', 'types.type'],
    });
  }
}
