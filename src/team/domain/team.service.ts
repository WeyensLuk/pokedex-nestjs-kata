import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Team } from './team.entity';
import { TeamDto } from '../entry-points/team.dto';

export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly repository: EntityRepository<Team>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(teamDto: TeamDto): Promise<Team> {
    const team = this.entityManager.create(Team, teamDto);
    await this.entityManager.persistAndFlush(team);
    return team;
  }

  async findAll(): Promise<Team[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<Team> {
    return this.repository.findOneOrFail(id);
  }

  async setPokemonsOnTeam(id: number, pokemons: number[]): Promise<Team> {
    const team = await this.repository.findOneOrFail(id);
    team.pokemons = pokemons;
    await this.entityManager.persistAndFlush(team);
    return team;
  }
}
