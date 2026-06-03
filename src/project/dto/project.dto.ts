import { ApiProperty } from '@nestjs/swagger';

export class FindAllProjectsDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: Number })
  batchCount: number;
}
