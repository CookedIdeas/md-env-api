import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { batches: true } },
      },
    });

    return projects.map(({ _count, ...project }) => ({
      ...project,
      batchCount: _count.batches,
    }));
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    return project;
  }

  async update(userId: string, id: string, dto: UpdateProjectDto) {
    await this.findOne(userId, id);

    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
