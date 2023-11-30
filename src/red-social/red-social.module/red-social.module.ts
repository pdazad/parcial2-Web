import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redSocialEntity } from '../red-social.entity/red-social.entity';
import { redSocialService } from '../red-social.service';

@Module({
  imports: [TypeOrmModule.forFeature([redSocialEntity])],
  providers: [redSocialService],
  exports: [redSocialService],
})
export class RedSocialModule {}
