import { ApiProperty } from '@nestjs/swagger';

export class CreateBatchDto {
  @ApiProperty({ example: 'Batch 1' })
  name: string;

  @ApiProperty({ example: 'clxyz123' })
  projectId: string;
}
