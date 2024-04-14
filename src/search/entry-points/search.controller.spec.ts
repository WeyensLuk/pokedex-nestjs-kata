import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestingModule, Test } from '@nestjs/testing';
import config from '../../mikro-orm.test.config';
import { PokemonSeeder } from '../../seeders/PokemonSeeder';
import { Pokemon } from '../../pokemon/domain/pokemon.entity';
import { SearchService } from '../domain/search.service';
import { SearchController } from './search.controller';

describe('SearchController', () => {
  let controller: SearchController;
  let orm: MikroORM;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [Pokemon] }),
      ],
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    orm = app.get<MikroORM>(MikroORM);
    const seeder = orm.getSeeder();
    await orm.schema.refreshDatabase();
    await seeder.seed(PokemonSeeder);

    controller = app.get<SearchController>(SearchController);
  });

  afterAll(async () => await orm.close(true));

  describe('findAll', () => {
    it('should return all pokemon if no query or limit has been given', async () => {
      expect(await controller.findAll()).toHaveLength(151);
    });

    it('should return all pokemon with a limit of 10', async () => {
      expect(await controller.findAll(null, 10)).toHaveLength(10);
    });

    it('should all pokemon with name containing "bulbasaur"', async () => {
      expect(await controller.findAll('bulbasaur')).toHaveLength(1);
    });

    it('should return all pokemon with name containing "saur" and a limit of 2', async () => {
      expect(await controller.findAll('saur', 2)).toHaveLength(2);
    });

    it('should return all pokemon with type "fire"', async () => {
      expect(await controller.findAll('fire')).toHaveLength(12);
    });
  });
});
