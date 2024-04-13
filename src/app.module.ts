import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PokemonModule } from './pokemon/domain/pokemon.module';

@Module({
  imports: [MikroOrmModule.forRoot(), PokemonModule],
})
export class AppModule {}
