import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IEventStoreOptions } from './event-store.types';

export const {
  ConfigurableModuleClass: ConfigurableEventStoreModule,
  MODULE_OPTIONS_TOKEN: EVENT_STORE_CONFIG_OPTIONS,
} = new ConfigurableModuleBuilder<IEventStoreOptions>()
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .setClassMethodName('forRoot')
  .build();
