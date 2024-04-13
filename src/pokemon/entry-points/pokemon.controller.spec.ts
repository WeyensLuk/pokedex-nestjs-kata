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
  });
});
