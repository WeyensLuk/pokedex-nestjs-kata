import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Team {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'array' })
  pokemons: number[] = [];
}
