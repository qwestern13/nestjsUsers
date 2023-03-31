import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";

interface TextBlockCreationAttrs {
    userid: number;
    searchname: string;
    title: string;
    image: string;
    content: string;
    group: string;

}

@Table({tableName: 'texstblock'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userid: number;

    //@ApiProperty({example: 'example@example.ex', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    searchname: string;

    //@ApiProperty({example: '1234qaq', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    //@ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string;

}