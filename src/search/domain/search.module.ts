import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Pokemon } from '../../pokemon/domain/pokemon.entity';
import { SearchController } from '../entry-points/search.controller';
import { SearchService } from './search.service';

@Module({
  controllers: [SearchController],
  exports: [],
  imports: [MikroOrmModule.forFeature({ entities: [Pokemon] })],
  providers: [SearchService],
})
export class SearchModule {}
