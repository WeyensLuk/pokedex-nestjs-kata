import { InjectRepository } from '@mikro-orm/nestjs';
import { IPokemon, Pokemon } from './pokemon.entity';
import { EntityRepository } from '@mikro-orm/core';

export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly repository: EntityRepository<Pokemon>,
  ) {}

  async findAll(query?: any): Promise<IPokemon[]> {
    return this.repository.findAll({
      populate: ['id', 'name', 'sprites.front_default', 'types', 'types.type'],
      fields: ['id', 'name'],
      orderBy:
        query && query.sortBy
          ? {
              [query?.sortBy]: query?.sortDirection
                ? query?.sortDirection
                : 'asc',
            }
          : null,
    });
  }

  async findOne(id: number): Promise<Pokemon> {
    return this.repository.findOneOrFail(id, {
      populate: ['sprites', 'types', 'types.type'],
    });
  }
}
