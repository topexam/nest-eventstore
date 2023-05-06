import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventStoreModule } from 'nest-eventstore';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventStoreModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configSrv: ConfigService) => ({
        endpoint: configSrv.get<string>('EVENT_STORE_ENDPOINT'),
        userCredentials: {
          username: configSrv.get<string>('EVENT_STORE_USERNAME'),
          password: configSrv.get<string>('EVENT_STORE_PASSWORD'),
        },
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
