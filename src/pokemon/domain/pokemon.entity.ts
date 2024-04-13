import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Pokemon {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
