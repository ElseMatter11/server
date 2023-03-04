import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";

@Controller('/tracks')
export class TrackController{
    constructor(private trackService:TrackService){

    }
    @Post()
    create(@Body()trackDto:CreateTrackDto){
        return this.trackService.create(trackDto);
    }
    @Get()
    getAll(){
        return this.trackService.getAll();
    }
    @Get()
    getOne(id:number){
        return this.trackService.getOne(id)
    }

    delete(){
        
    }
}
