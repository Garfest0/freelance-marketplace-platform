import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity';

export enum ProposalStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

@Entity()
export class Proposal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    price: number;



    @Column('text', { nullable: true })
    rejectionReason: string;

    @Column('text')
    coverLetter: string;

    @Column({
        type: 'simple-enum',
        enum: ProposalStatus,
        default: ProposalStatus.PENDING
    })
    status: ProposalStatus;

    @ManyToOne(() => Job, (job) => job.proposals)
    job: Job;

    @ManyToOne(() => User, (user) => user.proposals)
    freelancer: User;
}
