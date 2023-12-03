/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { redSocialDto } from '../red-social.dto/red-social.dto';
import { redSocialEntity } from '../red-social.entity/red-social.entity';
import { redSocialService } from '../red-social.service';

@Controller('redSocials')
@UseInterceptors(BusinessErrorsInterceptor)
export class redSocialController {
    constructor(private readonly redSocialService: redSocialService) {}

  @Get()
  async findAll() {
    return await this.redSocialService.findAll();
  }

  @Get(':redSocialId')
  async findOne(@Param('redSocialId') redSocialId: string) {
    return await this.redSocialService.findOne(redSocialId);
  }

  @Post()
  async create(@Body() redSocialDto: redSocialDto) {
    const redSocial: redSocialEntity = plainToInstance(redSocialEntity, redSocialDto);
    return await this.redSocialService.create(redSocial);
  }

  @Put(':redSocialId')
  async update(@Param('redSocialId') redSocialId: string, @Body() redSocialDto: redSocialDto) {
    const redSocial: redSocialEntity = plainToInstance(redSocialEntity, redSocialDto);
    return await this.redSocialService.update(redSocialId, redSocial);
  }

  @Delete(':redSocialId')
  @HttpCode(204)
  async delete(@Param('redSocialId') redSocialId: string) {
    return await this.redSocialService.delete(redSocialId);
  }
}