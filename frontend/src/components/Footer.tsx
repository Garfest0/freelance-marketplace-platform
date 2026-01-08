import { Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
    return (
        <footer className="bg-[#8b2fc9] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

                    {/* Site Kullanımı */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-wider uppercase mb-4">SİTE KULLANIMI</h4>
                        <ul className="space-y-2 text-sm text-purple-100">
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Genel Koşullar</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Site Haritası</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">İlan Satın Al</a></li>
                        </ul>
                    </div>

                    {/* Yardım */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-wider uppercase mb-4">YARDIM</h4>
                        <ul className="space-y-2 text-sm text-purple-100">
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Sorum Var</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Önerim Var</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Sık Sorulan Sorular</a></li>
                        </ul>
                    </div>

                    {/* Hakkımızda */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-wider uppercase mb-4">HAKKIMIZDA</h4>
                        <ul className="space-y-2 text-sm text-purple-100">
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Hakkımızda</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Reklam Verin</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">İletişim</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Kariyer Rehberi</a></li>
                        </ul>
                    </div>

                    {/* Veri Politikamız */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-wider uppercase mb-4">VERİ POLİTİKAMIZ</h4>
                        <ul className="space-y-2 text-sm text-purple-100">
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Aydınlatma Metinleri</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Veri Politikaları</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-all">Çerez Politikası</a></li>
                        </ul>
                    </div>

                    {/* Sosyal Medya */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm tracking-wider uppercase mb-4">SOSYAL MEDYA</h4>
                        <div className="flex flex-col space-y-3">
                            <a href="#" className="flex items-center space-x-2 text-purple-100 hover:text-white transition-colors">
                                <Facebook size={20} />
                                <span className="text-sm">Facebook</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 text-purple-100 hover:text-white transition-colors">
                                <Twitter size={20} />
                                <span className="text-sm">X (Twitter)</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 text-purple-100 hover:text-white transition-colors">
                                <Instagram size={20} />
                                <span className="text-sm">Instagram</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 text-purple-100 hover:text-white transition-colors">
                                <Youtube size={20} />
                                <span className="text-sm">Youtube</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 text-purple-100 hover:text-white transition-colors">
                                <Linkedin size={20} />
                                <span className="text-sm">Linkedin</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-purple-400/30 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <Logo light={true} className="w-8 h-8" textClassName="text-2xl" />
                        <p className="text-sm text-purple-200">Copyright © 2024 WorkFlow. Tüm hakları saklıdır.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors border border-white/20">
                            <span className="text-xs text-left">
                                <div className="text-[10px]">App Store'dan</div>
                                <div className="font-bold font-sans">İndirin</div>
                            </span>
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors border border-white/20">
                            <span className="text-xs text-left">
                                <div className="text-[10px]">Google Play</div>
                                <div className="font-bold font-sans">DEN ALIN</div>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-[10px] text-purple-300 text-center leading-relaxed max-w-4xl mx-auto">
                    WorkFlow Elektronik Yayıncılık ve İletişim Hizmetleri A.Ş. Özel İstihdam Bürosu olarak 31/08/2024 – 30/08/2027 tarihleri arasında faaliyette bulunmak üzere, Türkiye İş Kurumu tarafından 26/07/2024 tarih ve 16398069 sayılı karar uyarınca 170 nolu belge ile faaliyet göstermektedir. 4904 sayılı kanun uyarınca iş arayanlardan ücret alınması yasaktır.
                </div>
            </div>
        </footer>
    );
}
