import { Module } from '@nestjs/common';
import { CustomLogger } from './lib/logger';
import { UserModule } from './modules';
import { PostModule } from './modules/postModule/post.module'
// import { AuthModule } from './modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StudentModule } from './modules/studentModule/student.module';
import { CourseModule } from './modules/courseModule/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomLogger.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        //entities: [__dirname + '/../**/*.model{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.get('POSTGRES_SYNCHRONIZE'), // Be cautious about using synchronize in production
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    StudentModule,
    CourseModule
    // AuthModule
  ]
})
export class AppModule { }
