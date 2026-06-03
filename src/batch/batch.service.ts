import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBatchDto) {
    return this.prisma.batch.create({
      data: {
        name: dto.name,
        projectId: dto.projectId,
      },
    });
  }

  findAll(projectId: string) {
    return this.prisma.batch.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!batch) {
      throw new NotFoundException(`Batch with id "${id}" not found`);
    }

    return {
      ...batch,
    };
  }

  async update(id: string, dto: UpdateBatchDto) {
    await this.findOne(id);

    return this.prisma.batch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.batch.delete({
      where: { id },
    });
  }
}
