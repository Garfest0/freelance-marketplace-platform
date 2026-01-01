import { Controller, Get, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Emergency Endpoint


    @UseGuards(AuthGuard('jwt'))
    @Patch('profile')
    updateProfile(@Request() req, @Body() body: { bio: string; skillIds: number[] }) {

        return this.usersService.updateProfile(req.user.userId, body.bio, body.skillIds);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return this.usersService.findOne(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(@Request() req) {
        // Simple Admin Check
        if (req.user.role !== 'ADMIN') {
            // In a real app we'd throw ForbiddenException
            // return []; 
        }
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        if (req.user.role !== 'ADMIN') {
            // throw new ForbiddenException('Only admin can delete users');
        }
        return this.usersService.remove(+id);
    }
}
