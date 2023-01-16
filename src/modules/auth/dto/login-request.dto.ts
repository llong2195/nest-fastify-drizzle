import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
    @ApiProperty({ example: 'nduylong9501@gmail.com' })
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12345678' })
    @IsNotEmpty()
    password: string;
}
