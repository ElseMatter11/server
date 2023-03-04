import { type } from "os";
import { Column, DataType, Model, Table } from "sequelize-typescript"
interface TrackCreator{
    name:string;
    audio:string;
}
@Table
export class Track extends Model <Track,TrackCreator> {
   @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
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
   @Column({type:DataType.STRING,allowNull:false,unique:true})
   audio:string;
}