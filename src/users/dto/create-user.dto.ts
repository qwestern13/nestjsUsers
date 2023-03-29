import { ApiProperty} from '@nestjs/swagger';

export class CreateUserDto{

    @ApiProperty({example: 'example@example.ex', description: 'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example: '12334aasx', description: 'Пароль'})
    readonly password: string;
}