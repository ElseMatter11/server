import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
    forwardRef(()=>UsersModule) ,
    JwtModule.register({
      secret: process.env.PIVATE_KEY||'SECRET',
      signOptions:{
        expiresIn:'24h'
      }
    })
  ],
  exports:[
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
