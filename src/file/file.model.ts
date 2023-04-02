import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";
import { TextBlock } from "src/textblock/textblock.model";

interface ImageFileCreationAttrs {
    image: string;
}

@Table({tableName: 'images'})
export class ImageFile extends Model<ImageFile, ImageFileCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    image: string;

    
    @Column({type: DataType.INTEGER})
    essenceId: number;

    @Column({type: DataType.STRING})
    essenceTable: string;

}