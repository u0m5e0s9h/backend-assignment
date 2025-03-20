import { Controller, Get, Post, Body, Delete, Param, UsePipes, ValidationPipe, NotFoundException, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  // ✅ Modified GET route to support filtering by specialization and rating
  @Get()
  findAll(
    @Query('specialization') specialization?: string,
    @Query('rating') rating?: string, 
  ) {
    return this.matchService.findAll({
      specialization,
      rating: rating ? Number(rating) : undefined, // Convert rating to a number
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedMatch = await this.matchService.delete(id);
    if (!deletedMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }
    return { message: 'Match deleted successfully', deletedMatch };
  }
}
