import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
@Injectable()
export class AuthService {

    constructor(private userService:UsersService,
        private jwtService:JwtService){}

    async registration(userDto: CreateUserDto) {
        const candidate=await this.userService.getByEmail(userDto.email)
        if (candidate){
            throw new HttpException('пользователь с таким email существует',HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password,5);
        const user = await this.userService.createUser({...userDto,password:hashPassword})
        return this.generateToken(user)
    }
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    private async generateToken(user:User){
        const payload={email:user.email,id:user.Id}
        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto:CreateUserDto){
        const user = await this.userService.getByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password,user.password)
        if (user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message:'Некорректный Email или пароль'})
    }
}
