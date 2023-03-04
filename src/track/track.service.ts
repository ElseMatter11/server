import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Track } from "./track.model";

@Injectable()

export class TrackService{
    constructor(@InjectModel(Track) private trackRepository:typeof Track){

    }
    async create(dto:CreateTrackDto){
        const track=await this.trackRepository.create(dto)
        return track
    }

    async getAll(){
        const tracks=await this.trackRepository.findAll();
        return tracks;
        
    }
    async getOne(id:number){
        const oneTrack= await this.trackRepository.findByPk(id);
        return oneTrack
    }   

    async delete(id:number){
        await this.trackRepository.delete(id)
    }

}