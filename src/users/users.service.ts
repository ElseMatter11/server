import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository:typeof User){}
    async createUser(dto:CreateUserDto): Promise <User>{
        const user = await this.userRepository.create(dto)
        return user
    }
    async getAllUsers(): Promise <User[]>{
        const users = await this.userRepository.findAll()
        return users
    }

    async getById(Id:number): Promise <User>{
        const user = await this.userRepository.findOne({where:{Id},include:{all:true}})
        return user

    }
    async getByEmail(email:string): Promise <User>{
        const user = await this.userRepository.findOne({where:{email},include:{all:true}})
        return user

    }
}
