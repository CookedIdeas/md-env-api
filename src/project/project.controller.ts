import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 201 })
  create(@Req() req: Request, @Body() dto: CreateProjectDto) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return this.projectService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  @ApiResponse({ status: 200 })
  findAll(@Req() req: Request) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return this.projectService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return this.projectService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return this.projectService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  remove(@Req() req: Request, @Param('id') id: string) {
    const userId = (req as Request & { user: { id: string } }).user.id;
    return this.projectService.remove(userId, id);
  }
}
