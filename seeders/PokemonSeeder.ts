import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { IPokemon } from '../src/pokemon/domain/pokemon.entity';
import { readFileSync } from 'fs';

export class PokemonSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const rawPokemons = readFileSync('./seeders/pokemons.json', 'utf-8');
    for (const rawPokemon of JSON.parse(rawPokemons)) {
      const pokemon = rawPokemon as IPokemon;
      em.create('Pokemon', pokemon);
    }

    await em.flush();
  }
}
