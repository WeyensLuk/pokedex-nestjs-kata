import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'pokemon-test-db',
  password: 'postgres',
  driver: PostgreSqlDriver,
  seeder: {
    path: './seeders',
    defaultSeeder: 'PokemonSeeder',
    emit: 'ts',
  },
  extensions: [SeedManager],
});
