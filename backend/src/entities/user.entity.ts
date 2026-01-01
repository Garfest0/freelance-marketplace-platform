import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Job } from './job.entity';
import { Proposal } from './proposal.entity';
import { Skill } from './skill.entity';

export enum UserRole {
    CLIENT = 'CLIENT',
    FREELANCER = 'FREELANCER',
    ADMIN = 'ADMIN',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string; // Store hashed password

    @Column({ nullable: true })
    fullName: string;

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.FREELANCER
    })
    role: UserRole;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @OneToMany(() => Job, (job) => job.client)
    postedJobs: Job[];

    @OneToMany(() => Proposal, (proposal) => proposal.freelancer)
    proposals: Proposal[];

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[];
}
