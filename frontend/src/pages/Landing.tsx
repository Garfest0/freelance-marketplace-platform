
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar - Floating & Glassy */}
            <nav className="fixed top-6 left-0 right-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-sm border border-white/20 px-6 py-4 flex justify-between items-center transition-all hover:shadow-md">
                    <Logo className="w-10 h-10" />
                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                            Giriş Yap
                        </Link>
                        <Link to="/register">
                            <Button className="rounded-xl px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-lg shadow-slate-200 transition-all hover:scale-105 active:scale-95">
                                Kayıt Ol
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wide uppercase mb-6 border border-indigo-100">
                            <Star className="w-3 h-3" /> Geleceğin Çalışma Şekli
                        </span>
                        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-8">
                            Yeteneklerini <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                Sınırsızca Keşfet
                            </span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
                            WorkFlow, potansiyelinizi işe dönüştüren modern platform.
                            İster uzmanlığını sergile, ister projen için en iyi zihinleri bul.
                            Karmaşa yok, sadece sonuç var.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link to="/register">
                            <Button className="h-14 px-8 rounded-full text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                Hemen Başla <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/jobs">
                            <Button variant="secondary" className="h-14 px-8 rounded-full text-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                İlanlara Göz At
                            </Button>
                        </Link>
                    </motion.div>


                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Neden WorkFlow'u Seçmelisin?</h2>
                        <p className="mt-4 text-lg text-slate-600">Sıradan platformların aksine, biz sadece iş bulmanızı değil, kariyerinizi yönetmenizi sağlıyoruz.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
                                title: "Hızlı Eşleşme",
                                color: "bg-emerald-50"
                            },
                            {
                                icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
                                title: "Güvenli Ödeme",
                                color: "bg-blue-50"
                            },
                            {
                                icon: <Star className="w-6 h-6 text-violet-600" />,
                                title: "Kaliteli Ağ",
                                color: "bg-violet-50"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
