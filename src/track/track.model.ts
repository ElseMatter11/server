import { type } from "os";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model";
interface TrackCreator{
    name:string;
    artist:string;
    text:string;
    userId:number;
    listnes:number;
    audio:string;
    picture:string;
}
@Table
export class Track extends Model <Track,TrackCreator> {
   @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number;

    @Column({type:DataType.STRING,allowNull:false})
   name:string;

   @Column({type:DataType.STRING,allowNull:false})
   artist:string;

   @Column({type:DataType.STRING,allowNull:false})
   text:string;

   @Column({type:DataType.INTEGER,allowNull:true})
   listnes:number;

   @Column({type:DataType.STRING,allowNull:true})
   picture:string;

   @Column({type:DataType.STRING,allowNull:true,unique:true})
   audio:string;

    @BelongsTo(()=>User)
    author:string;
}