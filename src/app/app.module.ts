import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { StockModule } from 'src/stock/stock.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/stock-management'),
    UserModule,
    AuthModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }