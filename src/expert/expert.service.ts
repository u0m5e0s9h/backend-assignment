import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpertDto } from './dto/create-expert.dto';

@Injectable()
export class ExpertService {
  constructor(private prisma: PrismaService) {}

  async create(createExpertDto: CreateExpertDto) {
    return this.prisma.expert.create({ data: createExpertDto });
  }

  async findAll() {
    return this.prisma.expert.findMany();
  }
}
