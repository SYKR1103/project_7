import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { DblishModule } from './dblish/dblish.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'


@Module({
  imports: [ProductModule, UserModule, DblishModule, AuthModule, 


],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
