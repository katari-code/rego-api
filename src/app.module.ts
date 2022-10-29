import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    WarehouseModule,
    ProductModule,
  ],
})
export class AppModule {}
