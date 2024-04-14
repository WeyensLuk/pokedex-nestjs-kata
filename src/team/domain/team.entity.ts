import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Team {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryKey()
  @ApiProperty()
  id!: number;

  @Property()
  @ApiProperty()
  name!: string;

  @Property({ type: 'array' })
  @ApiProperty()
  pokemons: number[] = [];
}
