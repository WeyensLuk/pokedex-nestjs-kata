import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Pokemon } from '../src/modules/pokemon.entity';

export class PokemonSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const pokemons = [
      new Pokemon(1, 'Bulbasaur'),
      new Pokemon(2, 'Ivysaur'),
      new Pokemon(3, 'Venusaur'),
    ];

    for (const pokemon of pokemons) {
      em.create('Pokemon', pokemon);
    }

    await em.flush();
  }
}
