import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redSocialEntity } from '../red-social.entity/red-social.entity';
import { redSocialService } from '../red-social.service';
import { redSocialController } from '../red-social.controller/red-social.controller';
@Module({
  imports: [TypeOrmModule.forFeature([redSocialEntity])],
  providers: [redSocialService],
  exports: [redSocialService],
  controllers: [redSocialController],
})
export class RedSocialModule {}
