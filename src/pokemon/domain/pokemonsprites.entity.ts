import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export interface IPokemonSprites {
  id: number;
  front_default: string;
  front_female?: string | null;
  front_shiny: string;
  front_shiny_female?: string | null;
  back_default: string;
  back_female?: string | null;
  back_shiny: string;
  back_shiny_female?: string | null;
}

@Entity()
export class PokemonSprites implements IPokemonSprites {
  @PrimaryKey({ hidden: true })
  id!: number;

  @Property()
  front_default!: string;

  @Property({ nullable: true })
  front_female?: string | null;

  @Property()
  front_shiny!: string;

  @Property({ nullable: true })
  front_shiny_female?: string | null;

  @Property()
  back_default!: string;

  @Property({ nullable: true })
  back_female?: string | null;

  @Property()
  back_shiny!: string;

  @Property({ nullable: true })
  back_shiny_female?: string | null;
}
