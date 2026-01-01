import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal, ProposalStatus } from '../entities/proposal.entity';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { User } from '../entities/user.entity';
import { Job, JobStatus } from '../entities/job.entity';

@Injectable()
export class ProposalsService {
    constructor(
        @InjectRepository(Proposal)
        private proposalsRepository: Repository<Proposal>,
        @InjectRepository(Job)
        private jobsRepository: Repository<Job>,
    ) { }

    async accept(id: number): Promise<Proposal> {
        const proposal = await this.proposalsRepository.findOne({ where: { id }, relations: ['job'] });
        if (!proposal) throw new Error('Proposal not found');

        // 1. Accept this proposal
        proposal.status = ProposalStatus.ACCEPTED;
        await this.proposalsRepository.save(proposal);

        // 2. Reject others
        await this.proposalsRepository.createQueryBuilder()
            .update(Proposal)
            .set({ status: ProposalStatus.REJECTED })
            .where("jobId = :jobId", { jobId: proposal.job.id })
            .andWhere("id != :id", { id })
            .execute();

        // 3. Update Job Status
        await this.jobsRepository.update(proposal.job.id, { status: JobStatus.IN_PROGRESS });

        return proposal;
    }

    async create(createProposalDto: CreateProposalDto, freelancer: any): Promise<Proposal> {
        console.log('Creating proposal:', createProposalDto);
        console.log('Freelancer data:', freelancer);

        const proposal = this.proposalsRepository.create({
            ...createProposalDto,
            freelancer: { id: freelancer.userId } as User, // Explicitly map userId to id
            job: { id: createProposalDto.jobId } as any
        });
        return this.proposalsRepository.save(proposal);
    }

    async findByJob(jobId: number): Promise<Proposal[]> {
        return this.proposalsRepository.find({
            where: { job: { id: jobId } },
            relations: ['freelancer'],
            order: { id: 'DESC' }
        });
    }

    async findByFreelancer(freelancerId: number): Promise<Proposal[]> {
        return this.proposalsRepository.find({
            where: { freelancer: { id: freelancerId } },
            relations: ['job'],
            order: { id: 'DESC' }
        });
    }
}
