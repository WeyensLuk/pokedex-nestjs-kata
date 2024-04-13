import {
  Collection,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { PokemonSprites } from './pokemonsprites.entity';
import { PokemonTypeMap } from './pokemontypemap.entity';

export interface IPokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
}

@Entity()
export class Pokemon implements IPokemon {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToOne(() => PokemonSprites)
  sprites!: PokemonSprites;

  @ManyToMany(() => PokemonTypeMap)
  types = new Collection<PokemonTypeMap>(this);
}
