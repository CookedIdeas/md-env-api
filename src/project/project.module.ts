import { Module } from '@nestjs/common';
import { PrismaModule } from '../common/prisma/prisma.module';
import { AuthGuard } from '@/common/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService, AuthGuard],
})
export class ProjectModule {}
