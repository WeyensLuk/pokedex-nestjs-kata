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
  [x: string]: any;
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

  @Property()
  height!: number;

  @Property()
  weight!: number;

  @OneToOne(() => PokemonSprites)
  sprites!: PokemonSprites;

  @ManyToMany(() => PokemonTypeMap)
  types = new Collection<PokemonTypeMap>(this);
}
