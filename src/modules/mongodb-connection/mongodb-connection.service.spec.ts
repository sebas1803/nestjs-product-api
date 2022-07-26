import { Test, TestingModule } from '@nestjs/testing';
import { MongodbConnectionService } from './mongodb-connection.service';

describe('MongodbConnectionService', () => {
  let service: MongodbConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodbConnectionService],
    }).compile();

    service = module.get<MongodbConnectionService>(MongodbConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
