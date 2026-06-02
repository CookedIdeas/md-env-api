import { Module } from '@nestjs/common';
import { PrismaModule } from '../common/prisma/prisma.module';
import { AuthGuard } from '@/common/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BatchController],
  providers: [BatchService, AuthGuard],
})
export class BatchModule {}
