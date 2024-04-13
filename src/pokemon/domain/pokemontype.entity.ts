import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export interface IPokemonType {
  id: number;
  name: string;
}

@Entity()
export class PokemonType implements IPokemonType {
  @PrimaryKey({ hidden: true })
  id!: number;

  @Property()
  name!: string;
}
