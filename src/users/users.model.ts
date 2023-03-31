import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Role } from "../roles/roles.model";
import { BelongsToMany } from "sequelize-typescript";
import { UserRoles } from "src/roles/user-roles.model";
import { Tokens } from "src/tokens/token.model";
import { TextBlock } from "src/textblock/textblock.model";

interface UserCreationAttrs {
    email: string;
    password: string;

}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'example@example.ex', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '1234qaq', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Оскорбительное поведение', description: 'Причина бана'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasOne(() => Tokens)
    tokens: Tokens[];

    @HasMany(() => TextBlock)
    textblock: TextBlock[];
}