import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Briefcase, User } from 'lucide-react';
import { AuthRightSide } from '../components/AuthRightSide';
import { Logo } from '../components/Logo';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        role: 'FREELANCER', // Default role
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Kayıt işlemi başarısız.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-[#1A1A1A] font-sans">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white relative z-10 w-full lg:w-1/2">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-8">
                        <Logo className="w-10 h-10" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Hesap Oluştur
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Zaten hesabın var mı?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Giriş Yap
                        </Link>
                    </p>

                    <div className="mt-8">
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'FREELANCER' })}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${formData.role === 'FREELANCER'
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-500'
                                        }`}
                                >
                                    <User className="h-5 w-5 mb-1" />
                                    <span className="font-medium text-xs">Freelancer</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'CLIENT' })}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${formData.role === 'CLIENT'
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-500'
                                        }`}
                                >
                                    <Briefcase className="h-5 w-5 mb-1" />
                                    <span className="font-medium text-xs">İşveren</span>
                                </button>
                            </div>

                            <Input
                                label="Ad Soyad"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />

                            <Input
                                label="E-posta Adresi"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />

                            <Input
                                label="Şifre"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />

                            <Input
                                label="Şifre Tekrar"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <Button type="submit" className="w-full" isLoading={loading}>
                                Kayıt Ol
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <AuthRightSide />
        </div>
    );
}
