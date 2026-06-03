import { BatchStatus } from '@/generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneBatchDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: BatchStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  project: {
    name: string;
  };
}
