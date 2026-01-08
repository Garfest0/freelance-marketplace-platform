import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Temporary endpoint for manual admin promotion
  @Get('promote-admin')
  async promoteAdmin(@Query('email') email: string) {
    if (!email) return "Lütfen email parametresi gönderin";

    // Clean the input email just in case
    const cleanEmail = email.trim();

    const user = await this.usersRepository.findOne({ where: { email: cleanEmail } });

    if (!user) {
      // DEBUG: List all users to see what is going on
      const allUsers = await this.usersRepository.find();
      const userList = allUsers.map(u => `[${u.id}] ${u.email} (${u.role})`).join('\n');

      return `HATA: Kullanıcı bulunamadı: '${cleanEmail}'
        
        Sistemdeki MEVCUT Kullanıcılar (${allUsers.length}):
        -------------------------------------------
        ${userList || 'HİÇ KULLANICI YOK'}
        -------------------------------------------
        Eğer isminizi burada görüyorsanız, yukarıdaki e-postayı kopyalayıp parametre olarak kullanın.`;
    }

    user.role = UserRole.ADMIN;
    await this.usersRepository.save(user);

    return `BAŞARILI! ${user.fullName} (${user.email}) artık bir YÖNETİCİ (ADMIN).`;
  }
}
