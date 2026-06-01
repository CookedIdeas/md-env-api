import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Project' })
  name: string;

  @ApiProperty({ example: 'Project description', required: false })
  description?: string;
}
