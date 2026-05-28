import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        status: { type: 'string', example: 'ok' },
      },
    },
  })
  check() {
    return { status: 'ok' };
  }
}
