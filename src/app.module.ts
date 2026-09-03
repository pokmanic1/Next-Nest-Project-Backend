import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';


import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './lib/db';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    ContactModule,
    AuthModule,
    UsersModule,

  ],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
