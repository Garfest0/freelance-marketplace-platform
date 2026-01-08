import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { AuthRightSide } from '../components/AuthRightSide';
import { Logo } from '../components/Logo';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }

        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Giriş başarısız. Bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-[#1A1A1A] font-sans">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white relative z-10 w-full lg:w-1/2">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8">
                            <Logo className="w-10 h-10" />
                        </div>
                        <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Ana Sayfaya Dön
                        </Link>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Tekrar Hoşgeldiniz
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Hesabınıza giriş yaparak iş akışınızı yönetin. <br />
                            Veya{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                hemen ücretsiz kayıt olun.
                            </Link>
                        </p>
                    </motion.div>

                    <div className="mt-8">
                        <div className="mt-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 text-sm rounded-r"
                                >
                                    <p className="font-bold">Hata</p>
                                    <p>{error}</p>
                                </motion.div>
                            )}

                            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                <Input
                                    label="E-posta Adresi"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />

                                <div className="space-y-1">
                                    <Input
                                        label="Şifre"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-150 ease-in-out cursor-pointer"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                                            Beni Hatırla
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                            Şifremi Unuttum?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                        isLoading={loading}
                                    >
                                        Giriş Yap
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Artistic */}
            <AuthRightSide />
        </div>
    );
}
