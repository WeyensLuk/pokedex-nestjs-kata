import { MikroORM, NotFoundError } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestingModule, Test } from '@nestjs/testing';
import config from '../../mikro-orm.test.config';
import { PokemonSeeder } from '../../seeders/PokemonSeeder';
import { TeamController } from './team.controller';
import { TeamDto } from './team.dto';
import { TeamService } from '../domain/team.service';
import { Team } from '../domain/team.entity';
import { BadRequestException } from '@nestjs/common';

describe('TeamController', () => {
  let controller: TeamController;
  let orm: MikroORM;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({ entities: [Team] }),
      ],
      controllers: [TeamController],
      providers: [TeamService],
    }).compile();

    orm = app.get<MikroORM>(MikroORM);
    const seeder = orm.getSeeder();
    await orm.schema.refreshDatabase();
    await seeder.seed(PokemonSeeder);

    controller = app.get<TeamController>(TeamController);
  });

  afterAll(async () => await orm.close(true));

  describe('findAll', () => {
    it('should return all teams', async () => {
      await createTeam('TeamRed');

      expect(await controller.findAll()).toHaveLength(1);
    });

    it('should return an empty array when no teams are found', async () => {
      expect(await controller.findAll()).toHaveLength(0);
    });

    it('should return all teams with their properties properly filled in', async () => {
      await createTeam('TeamRed');

      const teams = await controller.findAll();
      expect(teams[0]).toHaveProperty('id');
      expect(teams[0]).toHaveProperty('name');
      expect(teams[0]).toHaveProperty('pokemons');
    });
  });

  describe('create', () => {
    it('should return a team and have all properties properly filled in', async () => {
      const team = await createTeam('TeamRed');

      expect(team.id).toBe(1);
      expect(team.name).toBe('TeamRed');
      expect(team.pokemons).toHaveLength(0);
    });

    it('should have saved the team to the database', async () => {
      await createTeam('TeamRed');

      const teams = await orm.em.findAll(Team, {});
      expect(teams).toHaveLength(1);
      expect(teams[0].name).toBe('TeamRed');
    });
  });

  describe('findOne', () => {
    it('should return a team with all properties properly filled in', async () => {
      const team = await createTeam('TeamRed');

      const foundTeam = await controller.findOne(team.id);
      expect(foundTeam.id).toBe(team.id);
      expect(foundTeam.name).toBe(team.name);
      expect(foundTeam.pokemons).toHaveLength(0);
    });

    it('should throw a NotFoundError when the team is not found', async () => {
      await expect(controller.findOne(1)).rejects.toThrow(NotFoundError);
    });
  });

  describe('setPokemonsOnTeam', () => {
    it('should return a team with the pokemons set', async () => {
      const team = await createTeam('Gary');
      const pokemons = [18, 65, 112, 59, 130, 3];

      const updatedTeam = await controller.setPokemonsOnTeam(team.id, pokemons);
      expect(updatedTeam.pokemons).toEqual(pokemons);
    });

    it('should throw a NotFoundError when the team is not found', async () => {
      await expect(controller.setPokemonsOnTeam(1, [1, 2, 3])).rejects.toThrow(
        NotFoundError,
      );
    });

    it('should have saved the team with the pokemons set to the database', async () => {
      const team = await createTeam('Gary');
      const pokemons = [18, 65, 112, 59, 130, 3];

      await controller.setPokemonsOnTeam(team.id, pokemons);

      const updatedTeam = await orm.em.findOne(Team, team.id);
      expect(updatedTeam.pokemons).toEqual(pokemons);
    });

    it('should throw a BadRequestException if more than 6 Pokemon are provided', async () => {
      const team = await createTeam('TeamOfSeven');
      const pokemons = [1, 2, 3, 4, 5, 6, 7];

      await expect(
        controller.setPokemonsOnTeam(team.id, pokemons),
      ).rejects.toThrow(BadRequestException);
    });
  });

  async function createTeam(name: string) {
    return await controller.create(new TeamDto(name));
  }
});
