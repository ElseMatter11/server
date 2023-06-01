import { Body, Controller, Delete, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Param, Query, UseGuards } from "@nestjs/common/decorators";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";

@Controller('/tracks')
export class TrackController{
    constructor(private trackService:TrackService){

    }
    // @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name:'picture' , maxCount: 1},
        {name:'audio', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body()trackDto:CreateTrackDto){
        const {picture,audio}=files;
        return this.trackService.create(trackDto,picture[0],audio[0]);
        }
    @Get()
    getAll(){
        return this.trackService.getAll();
    }
    @Get(':id')
    getOne(@Param('id') id:number){
        return this.trackService.getOne(id)
    }
    @Post('/listen')
    listen(@Param('id') id:number){
        return this.trackService.listen(id)
    }
    @Get()
    search(@Query('query') query:string){
        return this.trackService.search(query)
    }
}
