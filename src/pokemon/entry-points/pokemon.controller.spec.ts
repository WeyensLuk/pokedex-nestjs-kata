import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonSeeder } from '../../../seeders/PokemonSeeder';
import { MikroORM, NotFoundError } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.test.config';
import { PokemonService } from '../domain/pokemon.service';
import { Pokemon } from '../domain/pokemon.entity';
import { BadRequestException } from '@nestjs/common';

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

    it('should sort by name ascending if the query parameter is provided', async () => {
      const pokemons = await controller.findAll('name', 'asc');
      expect(pokemons[0].name).toBe('abra');
      expect(pokemons[1].name).toBe('aerodactyl');
      expect(pokemons[2].name).toBe('alakazam');
    });

    it('should sort by name descending if the query parameter is provided', async () => {
      const pokemons = await controller.findAll('name', 'desc');
      expect(pokemons[0].name).toBe('zubat');
      expect(pokemons[1].name).toBe('zapdos');
      expect(pokemons[2].name).toBe('wigglytuff');
    });

    it('should sort by id ascending if the query parameter is provided', async () => {
      const pokemons = await controller.findAll('id', 'asc');
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[1].name).toBe('ivysaur');
      expect(pokemons[2].name).toBe('venusaur');
    });

    it('should sort by id descending if the query parameter is provided', async () => {
      const pokemons = await controller.findAll('id', 'desc');
      expect(pokemons[0].name).toBe('mew');
      expect(pokemons[1].name).toBe('mewtwo');
      expect(pokemons[2].name).toBe('dragonite');
    });

    it('should sort ascending by default if not sortDirection is provided', async () => {
      const pokemons = await controller.findAll('id');
      expect(pokemons[0].name).toBe('bulbasaur');
      expect(pokemons[1].name).toBe('ivysaur');
      expect(pokemons[2].name).toBe('venusaur');
    });

    it('should throw an error if sortDirection is not one of "asc" or "desc"', async () => {
      await expect(controller.findAll('id', 'invalid')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if sortBy is a property that does not exist on Pokemon type', async () => {
      await expect(controller.findAll('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single pokemon', async () => {
      const pokemon = await controller.findOne(1);
      expect(pokemon).toBeDefined();
    });

    it('should return a Pokemon object with all fields filled in', async () => {
      const pokemon = await controller.findOne(1);
      expect(pokemon.id).toBe(1);
      expect(pokemon.name).toBe('bulbasaur');
      expect(pokemon.height).toBe(7);
      expect(pokemon.weight).toBe(69);
      expect(pokemon.sprites).toMatchObject({
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        front_female: null,
        front_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        front_shiny_female: null,
        back_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        back_female: null,
        back_shiny:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
        back_shiny_female: null,
      });
      expect(pokemon.types[0].slot).toBe(1);
      expect(pokemon.types[0].type.name).toBe('grass');
      expect(pokemon.types[1].slot).toBe(2);
      expect(pokemon.types[1].type.name).toBe('poison');
    });

    it('should return NotFoundException for an ID that is not known', async () => {
      await expect(controller.findOne(250)).rejects.toThrow(NotFoundError);
    });
  });

  describe('findAllPaginated', () => {
    it('should return the first 10 pokemon', async () => {
      const pokemons = await controller.findAllPaginated(null, null, 10, null);
      expect(pokemons).toHaveLength(10);
      expect(pokemons[0].name).toBe('bulbasaur');
    });

    it('should return the next 10 pokemon', async () => {
      const pokemons = await controller.findAllPaginated(null, null, 10, 10);
      expect(pokemons).toHaveLength(10);
      expect(pokemons[0].name).toBe('metapod');
    });

    it('should sort by name ascending', async () => {
      const pokemons = await controller.findAllPaginated(
        'name',
        'asc',
        null,
        null,
      );
      expect(pokemons[0].name).toBe('abra');
      expect(pokemons[1].name).toBe('aerodactyl');
      expect(pokemons[2].name).toBe('alakazam');
    });

    it('should return the last 11 pokemon', async () => {
      const pokemons = await controller.findAllPaginated('id', 'asc', 11, 140);
      expect(pokemons).toHaveLength(11);
      expect(pokemons[10].name).toBe('mew');
    });

    it('should throw an error if sortDirection is not one of "asc" or "desc"', async () => {
      await expect(
        controller.findAllPaginated('id', 'invalid'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if sortBy is a property that does not exist on Pokemon type', async () => {
      await expect(controller.findAllPaginated('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if limit is negative', async () => {
      await expect(controller.findAllPaginated(null, null, -1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if offset is negative', async () => {
      await expect(
        controller.findAllPaginated(null, null, null, -1),
      ).rejects.toThrow(BadRequestException);
    });

    it('should gracefully handle requesting more items than are available', async () => {
      const pokemons = await controller.findAllPaginated(
        null,
        null,
        1000,
        null,
      );
      expect(pokemons).toHaveLength(151);
    });
  });
});
