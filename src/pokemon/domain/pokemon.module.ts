import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonService } from './pokemon.service';
import { PokemonController } from '../entry-points/pokemon.controller';
import { Pokemon } from './pokemon.entity';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PokemonController],
  exports: [],
  imports: [MikroOrmModule.forFeature({ entities: [Pokemon] })],
  providers: [PokemonService],
})
export class PokemonModule {}
