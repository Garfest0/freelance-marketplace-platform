import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Job } from './entities/job.entity';
import { Proposal } from './entities/proposal.entity';
import { Skill } from './entities/skill.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ProposalsModule } from './proposals/proposals.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'freelance.db',
      entities: [User, Job, Proposal, Skill],
      synchronize: true, // Auto-create tables (Dev only)
    }),
    TypeOrmModule.forFeature([User, Job, Proposal, Skill]),
    AuthModule,
    UsersModule,
    JobsModule,
    ProposalsModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
