import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request, ForbiddenException, NotFoundException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() createJobDto: CreateJobDto) {
        return this.jobsService.create(createJobDto, { ...req.user, id: req.user.userId }); // Map userId to id for TypeORM
    }

    @Get()
    findAll() {
        return this.jobsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateJobDto: any, @Request() req) {
        const job = await this.jobsService.findOne(+id);
        if (!job) throw new NotFoundException('İlan bulunamadı');

        if (req.user.role !== 'ADMIN' && job.client.id !== req.user.userId) {
            throw new ForbiddenException('Bu işlem için yetkiniz yok');
        }
        return this.jobsService.update(+id, updateJobDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        const job = await this.jobsService.findOne(+id);
        if (!job) throw new NotFoundException('İlan bulunamadı');

        if (req.user.role !== 'ADMIN' && job.client.id !== req.user.userId) {
            throw new ForbiddenException('Bu işlem için yetkiniz yok');
        }
        return this.jobsService.remove(+id);
    }
}
