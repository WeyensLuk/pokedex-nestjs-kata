import { InjectRepository } from '@mikro-orm/nestjs';
import { IPokemon, Pokemon } from './pokemon.entity';
import { EntityRepository } from '@mikro-orm/core';

export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly repository: EntityRepository<Pokemon>,
  ) {}

  async findAll(
    sortBy?: string,
    sortDirection?: string,
    limit?: number,
    offset?: number,
  ): Promise<IPokemon[]> {
    return this.repository.findAll(
      this.createFindOptions(sortBy, sortDirection, limit, offset),
    );
  }

  private createFindOptions(
    sortBy?: string,
    sortDirection?: string,
    limit?: number,
    offset?: number,
  ): any {
    return {
      populate: ['id', 'name', 'sprites.front_default', 'types', 'types.type'],
      fields: ['id', 'name'],
      orderBy: sortBy
        ? {
            [sortBy]: sortDirection ? sortDirection : 'asc',
          }
        : null,
      limit: limit,
      offset: offset,
    };
  }

  async findOne(id: number): Promise<Pokemon> {
    return this.repository.findOneOrFail(id, {
      populate: ['sprites', 'types', 'types.type'],
    });
  }
}
