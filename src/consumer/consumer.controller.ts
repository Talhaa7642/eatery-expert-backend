import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Consumer } from './entities/consumer.entity';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @ApiOperation({
    description: 'A successful hit can return consumer object',
    summary: 'Register Consumer',
  })
  @ApiResponse({ status: 201, description: ' Successfully created consumer.', type: Consumer })
  @Post('/register')
  async create(@Body() body: CreateConsumerDto): Promise<Consumer> {
    try {
      const consumer = await this.consumerService.findOneByPhoneNumber(body.phoneNumber);
      if (!consumer) {
        return this.consumerService.create(body);
      }
      return consumer;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  findAll() {
    return this.consumerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumerDto: UpdateConsumerDto) {
    return this.consumerService.update(+id, updateConsumerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumerService.remove(+id);
  }
}
