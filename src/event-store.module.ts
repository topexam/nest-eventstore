import { Module } from '@nestjs/common';
import { ConfigurableEventStoreModule } from './event-store.module-definition';
import { EventStoreService } from './event-store.service';

@Module({
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule extends ConfigurableEventStoreModule {}
