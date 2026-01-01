import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposal } from '../entities/proposal.entity';
import { Job } from '../entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proposal, Job])],
  controllers: [ProposalsController],
  providers: [ProposalsService],
})
export class ProposalsModule { }
