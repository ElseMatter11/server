import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FileService, FileType } from "src/file/file.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Track } from "./track.model";

@Injectable()
 
export class TrackService{
   
    constructor(@InjectModel(Track) private trackRepository:typeof Track,
    private fileService:FileService
    ){

    }
    async create(dto:CreateTrackDto,picture,audio) : Promise<Track>{
        const audioPath =this.fileService.createFile(FileType.AUDIO,audio)
        const picturePath =this.fileService.createFile(FileType.IMAGE,picture)
        const track=await this.trackRepository.create({...dto,audio:audioPath,picture:picturePath,listnes:0})
        return track
    }

    async getAll(): Promise<Track[]>{
        const tracks=await this.trackRepository.findAll();
        return tracks;
        
    }
    async getOne(id:any) : Promise<Track>{
        const oneTrack= await this.trackRepository.findOne({where:{id}});
        return oneTrack
    }   

    async delete(id:number){
        const trackToDelete = await this.trackRepository.findOne({where:{id}});
        await this.trackRepository.destroy({where:{id}});
        return trackToDelete
    }
    async listen(id:number){
        const oneTrack= await this.trackRepository.findOne({where:{id}});
        oneTrack.listnes+=1
        oneTrack.save()
    }

    async search(query:string):Promise<Track[]> {
        const tracks = await this.trackRepository.findAll()
        return tracks
        
    }
}