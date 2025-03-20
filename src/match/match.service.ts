import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    // Check if client already has a match
    const existingMatch = await this.prisma.match.findFirst({
      where: { clientId: createMatchDto.clientId },
    });

    if (existingMatch) {
      throw new ConflictException('A match already exists for this client.');
    }

    try {
      return await this.prisma.match.create({
        data: {
          expertId: createMatchDto.expertId,
          clientId: createMatchDto.clientId,
          rating: createMatchDto.rating ?? 0,
          specialization: createMatchDto.specialization ?? null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('A match already exists for this client.');
      }
      throw error;
    }
  }

  async findAll(filters: { specialization?: string; rating?: number }) {
    return this.prisma.match.findMany({
      where: {
        ...(filters.specialization && { specialization: filters.specialization }),
        ...(filters.rating && { rating: filters.rating }), 
      },
      select: {
        id: true,
        expertId: true,
        clientId: true,
        rating: true,
        specialization: true,
      },
    });
  }
  
  

  //  Improved Delete Method
  async delete(id: string) {
    // Check if match exists before attempting deletion
    const match = await this.prisma.match.findUnique({
      where: { id },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    // Delete the match
    return await this.prisma.match.delete({
      where: { id },
    });
  }
}
