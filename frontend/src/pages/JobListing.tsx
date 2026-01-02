
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Search, DollarSign, Clock, Briefcase, User } from 'lucide-react';

export default function JobListing() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Failed to fetch jobs', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? job.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">İş İlanları</h1>
                    <p className="text-gray-500 mt-1">Yeteneklerinize uygun en iyi projeleri bulun.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="İlan başlığı veya açıklama ara..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-64">
                    <select
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Tüm Kategoriler</option>
                        <optgroup label="Yazılım & Teknoloji">
                            <option value="WEB_DEVELOPMENT">Web Geliştirme</option>
                            <option value="MOBILE_DEVELOPMENT">Mobil Uygulama</option>
                            <option value="GAME_DEVELOPMENT">Oyun Geliştirme</option>
                            <option value="AI_DATA_SCIENCE">Yapay Zeka & Veri</option>
                            <option value="DEVOPS_CLOUD">DevOps & Bulut</option>
                        </optgroup>
                        <optgroup label="Tasarım & Kreatif">
                            <option value="GRAPHIC_DESIGN">Grafik Tasarım</option>
                            <option value="UI_UX_DESIGN">UI/UX Tasarım</option>
                            <option value="VIDEO_ANIMATION">Video & Animasyon</option>
                            <option value="ILLUSTRATION">İllüstrasyon</option>
                        </optgroup>
                        <optgroup label="Pazarlama">
                            <option value="DIGITAL_MARKETING">Dijital Pazarlama</option>
                            <option value="SEO_SEM">SEO & SEM</option>
                            <option value="SOCIAL_MEDIA">Sosyal Medya</option>
                        </optgroup>
                        <optgroup label="Yazı & Çeviri">
                            <option value="CONTENT_WRITING">İçerik Yazarlığı</option>
                            <option value="TRANSLATION">Çeviri</option>
                            <option value="TECHNICAL_WRITING">Teknik Yazarlık</option>
                        </optgroup>
                        <optgroup label="Diğer">
                            <option value="ADMIN_SUPPORT">Asistanlık & Destek</option>
                            <option value="ENGINEERING">Mühendislik</option>
                            <option value="LEGAL">Hukuk</option>
                            <option value="FINANCE">Finans</option>
                            <option value="OTHER">Diğer</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Yükleniyor...</div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">İlan bulunamadı</h3>
                        <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
                    </div>
                ) : (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {job.category}
                                        </span>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${job.level === 'EXPERT' ? 'bg-purple-50 text-purple-700' :
                                            job.level === 'INTERMEDIATE' ? 'bg-orange-50 text-orange-700' :
                                                'bg-green-50 text-green-700'
                                            }`}>
                                            {job.level}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-2 max-w-2xl">
                                        {job.description}
                                    </p>
                                    <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
                                            <span className="font-medium text-gray-900">{job.budget} TL</span>
                                        </span>
                                        <span className="flex items-center">
                                            <User className="h-4 w-4 mr-1.5 text-gray-400" />
                                            {job.client?.fullName}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                                            {job.deadline}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/jobs/${job.id}`}>
                                    <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                        Detaylar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
