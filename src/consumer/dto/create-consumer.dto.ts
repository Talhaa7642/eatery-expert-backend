import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateConsumerDto {
  @ApiProperty({
    example: '+971123456789',
    description: 'The phone number of the account',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    example: 'Talha Shabbir',
    description: 'Name of consumer',
    format: 'string',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'Paragon City, Lahore',
    description: 'Address of consumer',
    format: 'string',
  })
  @IsString()
  address: string;
}
