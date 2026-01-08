import { Controller, Get, Post, Body } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    @Get()
    findAll() {
        return this.skillsService.findAll();
    }

    @Post()
    create(@Body('name') name: string) {
        return this.skillsService.create(name);
    }
}
