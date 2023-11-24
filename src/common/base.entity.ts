
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";



@Entity()


export class BaseEntity {


    @PrimaryGeneratedColumn()
    public id : string;

    @CreateDateColumn()
    public createdAt : Date;

    @UpdateDateColumn()
    public updatedAt : Date;




}