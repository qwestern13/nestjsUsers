import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Role } from "./roles.model";


@Table({tableName: 'userRoles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleid: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userid: number;

}