import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "src/auth/auth.module";
import { FileService } from "src/file/file.service";
import { User } from "src/users/users.model";
import { TrackController } from "./track.controller";
import { Track } from "./track.model";
import { TrackService } from "./track.service";



@Module({
    controllers:[TrackController],
    providers:[TrackService,FileService],
    imports:[
        SequelizeModule.forFeature([Track,User]),
        forwardRef(()=>AuthModule)
    ]
})
export class TrackModule{}
