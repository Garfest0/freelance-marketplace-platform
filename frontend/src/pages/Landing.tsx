import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Briefcase, Shield, Zap, Search } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Briefcase className="h-8 w-8 text-indigo-600" />
                                <span className="ml-2 text-xl font-bold text-gray-900">WorkFlow</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-500 hover:text-gray-900 font-medium">Giriş Yap</Link>
                            <Link to="/register">
                                <Button>Kayıt Ol</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Hayalindeki işi</span>{' '}
                                    <span className="block text-indigo-600 xl:inline">hemen bul.</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                    WorkFlow ile yeteneklerini sergile, binlerce işverenle buluş. Ya da projelerin için en iyi uzmanları keşfet. Güvenli, hızlı ve kolay.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/register">
                                            <Button className="w-full h-12 px-8 text-lg">Hemen Başla</Button>
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link to="/jobs">
                                            <Button variant="secondary" className="w-full h-12 px-8 text-lg">İlanlara Göz At</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 flex items-center justify-center">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                        alt="Team working"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Avantajlar</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Neden WorkFlow?
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <Zap className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">Hızlı Eşleşme</dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Gelişmiş algoritmamız ile yeteneklerinize en uygun ilanları anında görün.
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">Güvenli Ödeme</dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Ödemeleriniz iş teslimine kadar havuzda güvende tutulur.
                                    </dd>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        <Search className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-lg leading-6 font-medium text-gray-900">Detaylı Filtreleme</dt>
                                    <dd className="mt-2 text-base text-gray-500">
                                        Bütçe, süre ve kategoriye göre aradığınız işi veya uzmanı kolayca bulun.
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
