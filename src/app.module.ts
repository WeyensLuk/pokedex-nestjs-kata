import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonModule } from './pokemon/domain/pokemon.module';
import { TeamModule } from './team/domain/team.module';
import { SearchModule } from './search/domain/search.module';

@Module({
  imports: [MikroOrmModule.forRoot(), PokemonModule, TeamModule, SearchModule],
})
export class AppModule {}
