import { Logger, Module } from '@nestjs/common';
import { ConsumerModule } from './consumer/consumer.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ConsumerModule,
    
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: Logger }],
})
export class AppModule {}
