import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonSeeder } from '../../../seeders/PokemonSeeder';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Pokemon } from '../domain/pokemon.entity';
import config from '../../mikro-orm.test.config';
import { PokemonService } from '../domain/pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;
  let orm: MikroORM;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [Pokemon] }),
      ],
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    controller = app.get<PokemonController>(PokemonController);
    orm = app.get<MikroORM>(MikroORM);
    const seeder = orm.getSeeder();
    await orm.schema.refreshDatabase();
    await seeder.seed(PokemonSeeder);

    controller = app.get<PokemonController>(PokemonController);
  });

  afterAll(async () => await orm.close(true));

  describe('findAll', () => {
    it('should return all pokemon', async () => {
      expect(await controller.findAll()).toHaveLength(151);
    });

    it('should return Pokemon objects with all fields defined', async () => {
      const pokemon = (await controller.findAll())[0];
      expect(pokemon).toHaveProperty('id');
      expect(pokemon).toHaveProperty('name');
      expect(pokemon).toHaveProperty('sprites');
      expect(pokemon).toHaveProperty('types');
    });

    it('should return Pokemon objects with all fields properly filled in', async () => {
      const pokemon = (await controller.findAll())[0];
      expect(pokemon.id).toBe(1);
      expect(pokemon.name).toBe('bulbasaur');
      expect(pokemon.sprites.front_default).toBe(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      );
      expect(pokemon.types[0].slot).toBe(1);
      expect(pokemon.types[0].type.name).toBe('grass');
      expect(pokemon.types[1].slot).toBe(2);
      expect(pokemon.types[1].type.name).toBe('poison');
    });
  });
});
