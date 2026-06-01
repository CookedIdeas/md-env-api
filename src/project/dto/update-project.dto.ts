import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'My Project', required: false })
  name?: string;

  @ApiProperty({ example: 'Project description', required: false })
  description?: string;
}
