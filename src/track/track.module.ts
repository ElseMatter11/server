import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TrackController } from "./track.controller";
import { Track } from "./track.model";
import { TrackService } from "./track.service";



@Module({
    controllers:[TrackController],
    providers:[TrackService],
    imports:[
        SequelizeModule.forFeature([Track])
    ]
})
export class TrackModule{}
