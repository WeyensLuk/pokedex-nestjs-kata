import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'pokemon-db',
  host: 'host.docker.internal',
  password: 'postgres',
  driver: PostgreSqlDriver,
  seeder: {
    path: './src/seeders',
    defaultSeeder: 'PokemonSeeder',
    emit: 'ts',
  },
  extensions: [SeedManager],
});
