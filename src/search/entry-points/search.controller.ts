import { Controller, Get, Query } from '@nestjs/common';
import { IPokemon } from '../../pokemon/domain/pokemon.entity';
import { SearchService } from '../domain/search.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('query') query?: string,
    @Query('limit') limit?: number,
  ): Promise<IPokemon[]> {
    return this.searchService.findAll(query, limit);
  }
}
