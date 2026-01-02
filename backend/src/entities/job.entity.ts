import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Proposal } from './proposal.entity';

export enum JobStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    IN_PROGRESS = 'IN_PROGRESS'
}

export enum JobCategory {
    // Software
    WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
    MOBILE_DEVELOPMENT = 'MOBILE_DEVELOPMENT',
    GAME_DEVELOPMENT = 'GAME_DEVELOPMENT',
    AI_DATA_SCIENCE = 'AI_DATA_SCIENCE',
    DEVOPS_CLOUD = 'DEVOPS_CLOUD',

    // Design
    GRAPHIC_DESIGN = 'GRAPHIC_DESIGN',
    UI_UX_DESIGN = 'UI_UX_DESIGN',
    VIDEO_ANIMATION = 'VIDEO_ANIMATION',
    ILLUSTRATION = 'ILLUSTRATION',

    // Marketing
    DIGITAL_MARKETING = 'DIGITAL_MARKETING',
    SEO_SEM = 'SEO_SEM',
    SOCIAL_MEDIA = 'SOCIAL_MEDIA',

    // Writing
    CONTENT_WRITING = 'CONTENT_WRITING',
    TRANSLATION = 'TRANSLATION',
    TECHNICAL_WRITING = 'TECHNICAL_WRITING',

    // Other
    ADMIN_SUPPORT = 'ADMIN_SUPPORT',
    DATA_ENTRY = 'DATA_ENTRY',
    ENGINEERING = 'ENGINEERING',
    LEGAL = 'LEGAL',
    FINANCE = 'FINANCE',
    OTHER = 'OTHER'
}

export enum JobLevel {
    ENTRY = 'ENTRY',
    INTERMEDIATE = 'INTERMEDIATE',
    EXPERT = 'EXPERT'
}

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    deadline: Date;

    @Column('decimal')
    budget: number;

    @Column({
        type: 'simple-enum',
        enum: JobStatus,
        default: JobStatus.OPEN
    })
    status: JobStatus;

    @Column({
        type: 'simple-enum',
        enum: JobCategory,
        default: JobCategory.OTHER
    })
    category: JobCategory;

    @Column({
        type: 'simple-enum',
        enum: JobLevel,
        default: JobLevel.ENTRY
    })
    level: JobLevel;

    @ManyToOne(() => User, (user) => user.postedJobs, { onDelete: 'CASCADE' })
    client: User;

    @OneToMany(() => Proposal, (proposal) => proposal.job)
    proposals: Proposal[];
}
