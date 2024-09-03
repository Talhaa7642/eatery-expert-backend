import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { Consumer } from './entities/consumer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConsumerService {
  @InjectRepository(Consumer) private consumerRepository: Repository<Consumer>

  async create(body: CreateConsumerDto): Promise<Consumer> {
    const consumer= await this.consumerRepository.save(this.consumerRepository.create(body)).catch((err: any) => {
      throw new HttpException(
        {
          message: `${err}`,
        },
        HttpStatus.CONFLICT,
      );
    });
    return consumer;
  }

  findAll(): Promise<Consumer[]> {
    try {
      return this.consumerRepository.find();
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} consumer`;
  }

  update(id: number, updateConsumerDto: UpdateConsumerDto) {
    return `This action updates a #${id} consumer`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumer`;
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<Consumer | null> {
    const consumer = await this.consumerRepository.findOne({
      where: {
        phoneNumber,
      },
    })

    if (consumer) {
      return consumer;
    }

    return null;
  }
}
