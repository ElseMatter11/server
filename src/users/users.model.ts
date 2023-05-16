import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Track } from "src/track/track.model";
interface UserCreator{
    email:string;
    password:string;
}
@Table
export class User extends Model <User,UserCreator> {
    @ApiProperty({example:'1',description:'unique identificator'})
   @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    Id:number;
    @ApiProperty({example:'ivan@mail.ru',description:'email adress'})
    @Column({type:DataType.STRING,unique:true,allowNull:false})
   email:string;
   @ApiProperty({example:'qwerty123456',description:'password'})
   @Column({type:DataType.STRING,allowNull:false})
   password:string;
   @ApiProperty({example:'{}',description:'track dependency'})
   @HasMany(()=>Track)
   tracks:Track[]
}