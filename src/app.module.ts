import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { Track } from './track/track.model';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve} from 'path';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
      }
    ),
    TrackModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      models: [Track,User],
      autoLoadModels:true
    }),
    UsersModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AuthModule,
  ]
})
export class AppModule {}
