import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Version,
} from '@nestjs/common';
import { IPokemon } from '../domain/pokemon.entity';
import { PokemonService } from '../domain/pokemon.service';
import { ApiNotFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  async findAll(
    @Query('sortBy') sortBy?: string,
    @Query('sortDirection') sortDirection?: string,
  ): Promise<IPokemon[]> {
    console.log(sortBy);
    this.validateQueryParameters({ sortBy, sortDirection });
    return this.pokemonService.findAll(sortBy, sortDirection);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Pokemon not found' })
  async findOne(@Param('id') id: number): Promise<IPokemon> {
    return this.pokemonService.findOne(id);
  }

  @Get()
  @Version('2')
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  async findAllPaginated(
    @Query('sortBy') sortBy?: string,
    @Query('sortDirection') sortDirection?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<IPokemon[]> {
    this.validateQueryParameters({ sortBy, sortDirection, limit, offset });
    return this.pokemonService.findAll(sortBy, sortDirection, limit, offset);
  }

  private validateQueryParameters(query: any) {
    if (!query) return;
    if (query.sortDirection && !['asc', 'desc'].includes(query.sortDirection))
      throw new BadRequestException(
        'Invalid sortDirection. Must be either "asc" or "desc"',
      );
    if (query.sortBy && !['name', 'id'].includes(query.sortBy))
      throw new BadRequestException(
        'Invalid sortBy field. Must be either "name" or "id"',
      );
    if (query.limit && query.limit < 0)
      throw new BadRequestException('Invalid limit. Must be greater than 0');
    if (query.offset && query.offset < 0)
      throw new BadRequestException('Invalid offset. Must be greater than 0');
  }
}
