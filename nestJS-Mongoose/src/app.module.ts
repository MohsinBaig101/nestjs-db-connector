import { Module } from '@nestjs/common';
import { CustomLogger } from './lib/logger';
import { UserModule } from './modules';
import { AuthModule } from './modules';
import { CustomMongooseModule } from './loaders';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomLogger.forRoot({isGlobal: true}),
    CustomMongooseModule.forRoot(process.env.MONGOOSE_URL, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('mongodb is connected');
          mongoose.set('debug', true);
        });
        connection._events.connected();
        return connection;
      },
      retryAttempts:2,
      retryDelay:1000
    }),
    UserModule,
    AuthModule
  ]
})
export class AppModule { }
