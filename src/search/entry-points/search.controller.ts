import { Controller, Get, Query } from '@nestjs/common';
import { IPokemon } from '../../pokemon/domain/pokemon.entity';
import { SearchService } from '../domain/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async findAll(
    @Query('query') query?: string,
    @Query('limit') limit?: number,
  ): Promise<IPokemon[]> {
    return this.searchService.findAll(query, limit);
  }
}
