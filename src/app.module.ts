import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbConnectionModule } from './modules/mongodb-connection/mongodb-connection.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import GlobalConfig from './config/global.config';
require('dotenv').config();

@Module({
  imports: [
    ProductModule,
    MongodbConnectionModule,
    ConfigModule.forRoot({
      load: [GlobalConfig],
      envFilePath: `./environment/${process.env.NODE_ENV}.env`,
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
