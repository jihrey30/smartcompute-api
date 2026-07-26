import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.automationsService.create(req.user.userId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.automationsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.automationsService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() data: Prisma.AutomationUpdateInput,
  ) {
    return this.automationsService.update(req.user.userId, id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.automationsService.remove(req.user.userId, id);
  }
}
