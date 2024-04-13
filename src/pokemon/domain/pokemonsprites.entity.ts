import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Pokemon } from './pokemon.entity';

export interface IPokemonSprites {
  id: number;
  front_default: string;
  pokemon?: Pokemon;
}

@Entity()
export class PokemonSprites implements IPokemonSprites {
  @PrimaryKey({ hidden: true })
  id!: number;

  @Property()
  front_default!: string;
}
