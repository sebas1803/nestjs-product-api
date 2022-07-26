import { Module } from '@nestjs/common';
import { MongodbConnectionService } from './mongodb-connection.service';

@Module({
  providers: [MongodbConnectionService],
  exports: [MongodbConnectionService]
})
export class MongodbConnectionModule { }
