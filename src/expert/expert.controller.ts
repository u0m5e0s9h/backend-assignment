import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { CreateExpertDto } from './dto/create-expert.dto';

@Controller('experts')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Post()
  create(@Body() createExpertDto: CreateExpertDto) {
    return this.expertService.create(createExpertDto);
  }

  @Get()
  findAll() {
    return this.expertService.findAll();
  }
}
