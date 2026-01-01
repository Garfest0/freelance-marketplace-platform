import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Skill } from '../entities/skill.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id }, relations: ['skills'] });
    }

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(userData);
        return this.usersRepository.save(newUser);
    }

    async update(id: number, updateData: { bio?: string; skills?: string[] }): Promise<User> {
        const user = await this.findOne(id);
        if (!user) throw new Error('User not found');

        if (updateData.bio !== undefined) {
            user.bio = updateData.bio;
        }

        // Skill update logic here if needed via updateData
        // We assume skills are passed as names or IDs. Let's assume names for simplicity, or we can look them up.
        // Actually, for M:N with TypeORM, we should pass skill entities.
        // Let's assume we receive an array of Skill IDs from frontend? Or names?
        // Let's stick to simple: Frontend sends IDs.
        // But verify calls might be complex. Let's accept Partial<Skill>[] or just ids.
        // Actually, we can load skills by IDs.
        // For now, let's assume the frontend sends the full Skill objects or we find them.
        // Let's try to handle IDs.
        // user.skills = updateData.skills.map(id => ({ id } as any));


        return this.usersRepository.save(user);
    }

    async updateProfile(id: number, bio: string, skillIds: number[]): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['skills'] });
        if (!user) throw new Error('User not found');

        if (bio !== undefined) user.bio = bio;

        if (skillIds) {
            // In TypeORM for ManyToMany, we can't just set IDs to entities directly if we want to be safe,
            // but TypeORM usually accepts objects with IDs for relation saving.
            // Let's cast to any to bypass strict type check if needed, or create partial objects.
            user.skills = skillIds.map(sid => ({ id: sid } as Skill));
        }

        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['skills']
        });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }


}
