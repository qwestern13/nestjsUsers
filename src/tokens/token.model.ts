import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";

interface TokenCreationAttrs {
    userid: number;
    refreshToken: string;

}

@Table({tableName: 'tokens'})
export class Tokens extends Model<Tokens, TokenCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userid: number;

    @Column({type: DataType.STRING})
    refreshToken: string;

}