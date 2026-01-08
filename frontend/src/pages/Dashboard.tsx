
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Briefcase, LayoutDashboard, Plus, X } from 'lucide-react';
import { Input } from '../components/ui/Input';

export default function Dashboard() {
    const [myItems, setMyItems] = useState<any[]>([]); // Jobs for client, Proposals for freelancer
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // New Job Form State
    const [showNewJobModal, setShowNewJobModal] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', description: '', budget: '', category: '', level: '' });

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const u = JSON.parse(userStr);
            setUser(u);
            fetchDashboardData(u.role);
        }
    }, []);

    const fetchDashboardData = async (role: string) => {
        try {
            if (role === 'CLIENT') {
                // Get my posted jobs - Need backend endpoint or filter
                // For now getting all and filtering client side as a quick fix, assuming low volume
                const response = await api.get('/jobs');
                // Optimization: In real app, /jobs?client=me
                const myJobs = response.data.filter((j: any) => j.client.id === JSON.parse(localStorage.getItem('user') || '{}').id);
                setMyItems(myJobs);
            } else {
                // Get my proposals
                const response = await api.get('/proposals/me');
                setMyItems(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/jobs', { ...newJob, budget: Number(newJob.budget) });
            setShowNewJobModal(false);
            setNewJob({ title: '', description: '', budget: '', category: '', level: '' });
            if (user?.role === 'CLIENT') fetchDashboardData('CLIENT');
        } catch (error: any) {
            console.error('Failed to create job', error);
            const message = error.response?.data?.message;
            const errorText = Array.isArray(message) ? message.join(', ') : (message || 'İlan oluşturulamadı.');
            alert(`Hata: ${errorText} `);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        Kontrol Paneli
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {user?.role === 'CLIENT' ? 'Yayınladığınız ilanları ve gelen teklifleri yönetin.' : 'Başvurularınızı ve süreçlerinizi takip edin.'}
                    </p>
                </div>
                <div className="flex gap-3">
                    {user?.role === 'CLIENT' && (
                        <Button onClick={() => setShowNewJobModal(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni İlan
                        </Button>
                    )}
                    <Link to="/jobs">
                        <Button variant="outline">İlanlara Göz At</Button>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">
                        {user?.role === 'CLIENT' ? 'Aktif İlanlarım' : 'Bekleyen Başvurularım'}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{myItems.length}</p>
                </div>
                {/* More stats can be added here */}
            </div>

            {/* Content List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {user?.role === 'CLIENT' ? 'Son İlanlarım' : 'Son Başvurularım'}
                    </h2>
                    <Link to={user?.role === 'CLIENT' ? '#' : '/proposals'} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        Tümünü Gör
                    </Link>
                </div>
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
                    ) : myItems.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Briefcase className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                            <p>Henüz bir kaydınız bulunmuyor.</p>
                        </div>
                    ) : (
                        myItems.slice(0, 3).map((item) => (
                            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                {/* ... (Keeping same item rendering but limited to 3) */}
                                <div className="flex justify-between items-start">
                                    {user?.role === 'CLIENT' ? (
                                        <>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                    <span>{item.budget} TL</span>
                                                    <span>•</span>
                                                    <span>{item.deadline}</span>
                                                    <span>•</span>
                                                    <span className="text-indigo-600 font-medium">{item.proposals?.length || 0} Teklif</span>
                                                </div>
                                            </div>
                                            <Link to={`/jobs/${item.id}`}>
                                                <Button variant="outline" className="text-xs">Yönet</Button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{item.job.title}</h3>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                    <span className="font-medium text-indigo-600">{item.price} TL teklif verdiniz</span>
                                                    <span>•</span>
                                                    <span>{item.duration} gün</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                                    Bekliyor
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Job Modal (Client Only) */}
            {showNewJobModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Proje Detayları</h3>
                                <p className="text-sm text-gray-500">Aradığınız yeteneği bulmak için detayları girin.</p>
                            </div>
                            <button onClick={() => setShowNewJobModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleCreateJob} className="space-y-6">
                                <Input label="İlan Başlığı" placeholder="Örn: E-Ticaret Sitesi Arayüz Tasarımı" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white" value={newJob.category} onChange={e => setNewJob({ ...newJob, category: e.target.value })} required>
                                            <option value="">Seçiniz</option>
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deneyim Seviyesi</label>
                                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white" value={newJob.level} onChange={e => setNewJob({ ...newJob, level: e.target.value })} required>
                                            <option value="">Seçiniz</option>
                                            <option value="ENTRY">Başlangıç (Entry)</option>
                                            <option value="INTERMEDIATE">Orta (Intermediate)</option>
                                            <option value="EXPERT">Uzman (Expert)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Proje Açıklaması</label>
                                    <textarea className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[120px]" placeholder="Projenizi detaylandırın. Beklentileriniz, teknolojiler ve teslim süresi hakkında bilgi verin." value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} required />
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <Input label="Bütçe (TL)" type="number" placeholder="0.00" value={newJob.budget} onChange={e => setNewJob({ ...newJob, budget: e.target.value })} required />
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => setShowNewJobModal(false)}>Vazgeç</Button>
                                    <Button type="submit" className="min-w-[120px]">İlanı Yayınla</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
