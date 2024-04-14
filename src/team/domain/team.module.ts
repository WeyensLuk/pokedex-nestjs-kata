import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TeamController } from '../entry-points/team.controller';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  exports: [],
  imports: [MikroOrmModule.forFeature({ entities: [Team] })],
  providers: [TeamService],
})
export class TeamModule {}
