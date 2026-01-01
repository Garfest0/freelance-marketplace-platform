import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
