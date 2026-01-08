import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../entities/skill.entity';

@Injectable()
export class SkillsService implements OnModuleInit {
    constructor(
        @InjectRepository(Skill)
        private skillsRepository: Repository<Skill>,
    ) { }

    async onModuleInit() {
        const count = await this.skillsRepository.count();
        if (count === 0) {
            const skills = ['React', 'NestJS', 'TypeScript', 'Node.js', 'Python', 'Django', 'Graphic Design', 'Logo Design', 'SEO', 'Content Writing'];
            for (const name of skills) {
                await this.skillsRepository.save({ name });
            }
        }
    }

    findAll() {
        return this.skillsRepository.find();
    }

    async create(name: string) {
        const existing = await this.skillsRepository.findOne({ where: { name } });
        if (existing) {
            return existing;
        }
        const skill = this.skillsRepository.create({ name });
        return this.skillsRepository.save(skill);
    }
}
