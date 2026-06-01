import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BatchService } from './batch.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@ApiTags('batches')
@Controller('batches')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a batch' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateBatchDto) {
    return this.batchService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all batches for a project' })
  @ApiResponse({ status: 200 })
  findAll(@Query('projectId') projectId: string) {
    return this.batchService.findAll(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a batch by id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string) {
    return this.batchService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a batch' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() dto: UpdateBatchDto) {
    return this.batchService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a batch' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  remove(@Param('id') id: string) {
    return this.batchService.remove(id);
  }
}
