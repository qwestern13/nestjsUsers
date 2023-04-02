import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, ForeignKey, Column, DataType, Model, Table, HasOne } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";
import { ImageFile } from "src/file/file.model";

interface TextBlockCreationAttrs {
    userid: number;
    imageid: number;
    searchname: string;
    title: string;
    content: string;
    group: string;

}

@Table({tableName: 'textblock'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    
    @ApiProperty({example: '', description: 'Уникальное имя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    searchname: string;

    @ApiProperty({example: 'Заметка', description: 'Заголовок'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    
    @Column({type: DataType.INTEGER})
    imageid: number;


    @ApiProperty({example: '', description: 'Текст поста'})
    @Column({type: DataType.STRING})
    content: string;

    @ApiProperty({example: 'main-page', description: 'Группа страниц'})
    @Column({type: DataType.STRING, allowNull: false})
    group: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userid: number;

}