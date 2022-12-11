import { Credentials } from '@eventstore/db-client';

export type IEventStoreOptions = {
  endpoint: string;
  insecure?: boolean;
  userCredentials: Credentials;
};
