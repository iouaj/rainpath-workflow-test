import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello from the API!';
  }

  async getHealth() {
    const workflowCount = await this.prisma.workflow.count();
    return {
      status: 'ok',
      database: 'connected',
      workflowCount,
    };
  }
}
