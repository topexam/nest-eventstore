import { Injectable } from '@nestjs/common';
import { EventStoreService } from 'nest-eventstore';
@Injectable()
export class AppService {
  constructor(private readonly eventStoreSrv: EventStoreService) {}

  sendRequest(): Promise<any> {
    return this.eventStoreSrv.appendEvent('demo-events', {
      type: 'abc.created',
      data: {},
    });
  }
}
