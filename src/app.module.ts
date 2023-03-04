import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrackModule } from './track/track.module';
import { ConfigModule } from '@nestjs/config';
import { Track } from './track/track.model';

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
      models: [Track],
      autoLoadModels:true
    }),
  ]
})
export class AppModule {}
