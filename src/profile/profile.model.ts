import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { UserRoles } from "../roles/user-roles.model";
import { TextBlock } from "src/textblock/textblock.model";

interface ProfileCreationAttrs {
    image: string;
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userid: number;

    @ApiProperty({example: 'Иван', description: 'Имя пользователя'})
    @Column({type: DataType.STRING})
    name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия пользователя'})
    @Column({type: DataType.STRING})
    surname: string;

    @ApiProperty({example: '+777777777777', description: 'Номер телефона'})
    @Column({type: DataType.STRING})
    phone: string;

}