import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @ApiOperation({summary:'User Creation'})
    @ApiResponse({status: 200,type:User})
    @Post()
    create(@Body()userDto:CreateUserDto){
        return this.usersService.createUser(userDto)
    }
    
    @ApiOperation({summary:'Get Users'})
    @ApiResponse({status: 200,type:[User]})
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary:'Get User by id'})
    @ApiResponse({status: 200,type:User})
    @Get('/id')
    getOneUser(@Param('id') id:number){
        id=6
        return this.usersService.getById(id)
    }
}
