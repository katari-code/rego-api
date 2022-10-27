import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.softDelete();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async softDelete() {
    this.$use(async (params, next) => {
      if (params.action == 'delete') {
        params.action = 'update';
        params.args['data'] = { deleted: true };
      }
      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data != undefined) {
          params.args.data['deleted'] = true;
        } else {
          params.args['data'] = { deleted: true };
        }
      }
      return next(params);
    });
  }
}
