import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { PokemonType } from './pokemontype.entity';

export interface IPokemonTypes {
  id: number;
  slot: number;
  type: PokemonType;
}

@Entity()
export class PokemonTypeMap implements IPokemonTypes {
  @PrimaryKey({ hidden: true })
  id!: number;

  @Property()
  slot: number;

  @ManyToOne()
  type: PokemonType;
}
