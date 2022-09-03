import { Credentials } from '@eventstore/db-client';

export type IEventStoreOptions = {
  endpoint: string;
  userCredentials: Credentials;
};
