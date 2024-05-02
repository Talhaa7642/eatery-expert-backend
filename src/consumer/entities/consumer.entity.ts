import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Consumer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '+971123456789' })
  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ example: 'M Soban Idrees' })
  @Column({ nullable: true })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'House # 5, Street # 5, Younispurah, Lahore' })
  @Column({ nullable: true })
  @IsString()
  address: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
