import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.get('DATABASE_URL', null, true),
                }
            }
        });
    }
  
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}