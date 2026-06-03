import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindAllProjectsDTO } from './dto/project.dto';

@ApiTags('projects')
@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 201 })
  create(
    @CurrentUser() user: { id: string; email: string; name: string },
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  @ApiResponse({ status: 200, type: FindAllProjectsDTO, isArray: true })
  findAll(@CurrentUser() user: { id: string; email: string; name: string }) {
    return this.projectService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  findOne(
    @CurrentUser() user: { id: string; email: string; name: string },
    @Param('id') id: string,
  ) {
    return this.projectService.findOne(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  update(
    @CurrentUser() user: { id: string; email: string; name: string },
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectService.update(user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  remove(
    @CurrentUser() user: { id: string; email: string; name: string },
    @Param('id') id: string,
  ) {
    return this.projectService.remove(user.id, id);
  }
}
