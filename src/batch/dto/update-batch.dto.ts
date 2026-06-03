import { ApiProperty } from '@nestjs/swagger';
import { BatchStatus } from '../../generated/prisma/client';

export class UpdateBatchDto {
  @ApiProperty({ example: 'Batch 1', required: false })
  name?: string;

  @ApiProperty({ enum: BatchStatus, required: false })
  status?: BatchStatus;
}
