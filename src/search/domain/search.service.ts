import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Pokemon, IPokemon } from '../../pokemon/domain/pokemon.entity';

export class SearchService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly repository: EntityRepository<Pokemon>,
  ) {}

  async findAll(query?: string, limit?: number): Promise<IPokemon[]> {
    return this.repository.findAll(this.createFindOptions(query, limit));
  }

  private createFindOptions(query: string, limit: number) {
    const findOptions: any = {};
    if (query) {
      findOptions.where = {
        $or: [
          { name: { $like: `%${query}%` } },
          { types: { $some: { type: { name: { $like: `%${query}%` } } } } },
        ],
      };
    }
    if (limit) {
      findOptions.limit = limit;
    }
    return findOptions;
  }
}
