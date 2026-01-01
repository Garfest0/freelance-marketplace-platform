import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus, JobCategory, JobLevel } from '../entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private jobsRepository: Repository<Job>,
    ) { }

    async create(createJobDto: CreateJobDto, user: User): Promise<Job> {
        const job = this.jobsRepository.create({
            ...createJobDto,
            category: createJobDto.category as JobCategory,
            level: createJobDto.level as JobLevel,
            client: user,
            status: JobStatus.OPEN
        });
        return this.jobsRepository.save(job);
    }

    async findAll(): Promise<Job[]> {
        return this.jobsRepository.find({
            relations: ['client', 'proposals'],
            order: { id: 'DESC' }
        });
    }

    async findOne(id: number): Promise<Job | null> {
        return this.jobsRepository.findOne({ where: { id }, relations: ['client', 'proposals'] });
    }

    async update(id: number, updateJobDto: any): Promise<Job | null> {
        await this.jobsRepository.update(id, updateJobDto);
        return this.jobsRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.jobsRepository.delete(id);
    }
}
