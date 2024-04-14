import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  constructor(name: string) {
    this.name = name;
  }

  @ApiProperty()
  name: string;
}
