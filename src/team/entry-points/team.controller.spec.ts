import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TestingModule, Test } from '@nestjs/testing';
import config from '../../mikro-orm.test.config';
import { PokemonSeeder } from '../../../seeders/PokemonSeeder';
import { TeamController } from './team.controller';
import { TeamDto } from './team.dto';
import { TeamService } from '../domain/team.service';
import { Team } from '../domain/team.entity';

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

  async function createTeam(name: string) {
    return await controller.create(new TeamDto(name));
  }
});
