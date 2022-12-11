import { Inject, Injectable } from '@nestjs/common';
import {
  EventStoreDBClient,
  EventType,
  jsonEvent,
  JSONEventType,
  JSONType,
  ReadStreamOptions,
} from '@eventstore/db-client';
import { ReadableOptions } from 'stream';

import { EVENT_STORE_CONFIG_OPTIONS } from './event-store.module-definition';
import { IEventStoreOptions } from './event-store.types';

@Injectable()
export class EventStoreService {
  private _esClient: EventStoreDBClient;

  constructor(@Inject(EVENT_STORE_CONFIG_OPTIONS) options: IEventStoreOptions) {
    this._esClient = new EventStoreDBClient(
      {
        endpoint: options.endpoint,
      },
      { insecure: options.insecure ?? false },
      options.userCredentials,
    );
  }

  get esClient() {
    return this._esClient;
  }

  appendEvent<D extends JSONType>(
    streamName: string,
    event: JSONEventType<string, D, unknown>,
  ) {
    const joinedEvent = jsonEvent<JSONEventType<string, D, unknown>>(event);
    return this._esClient.appendToStream(streamName, joinedEvent);
  }

  readEventsByStream<T extends EventType>(
    streamName: string,
    readOpts: ReadStreamOptions,
    readableOpts?: ReadableOptions,
  ) {
    return this.esClient.readStream<T>(streamName, readOpts, readableOpts);
  }

  readAllEvents(readOpts: ReadStreamOptions, readableOpts?: ReadableOptions) {
    return this.esClient.readAll(readOpts, readableOpts);
  }
}
