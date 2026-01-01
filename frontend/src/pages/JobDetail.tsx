import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DollarSign, User, Calendar, ArrowLeft, CheckCircle, Trash2, Edit, X } from 'lucide-react';

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Proposal Form State
    const [proposal, setProposal] = useState({ price: '', coverLetter: '' });
    const [submitting, setSubmitting] = useState(false);

    // Client view: Proposals list
    const [proposals, setProposals] = useState<any[]>([]);

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editJob, setEditJob] = useState({ title: '', description: '', budget: '', category: '', level: '' });
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const userData = JSON.parse(userStr);
            setUser(userData);
            fetchJobDetails(userData);
        }
    }, [id]);

    const fetchJobDetails = async (currentUser: any) => {
        try {
            const response = await api.get(`/jobs/${id}`);
            setJob(response.data);

            // If user is the owner, fetch proposals
            if (currentUser.role === 'CLIENT' && response.data.client.id === currentUser.id) {
                fetchProposals();
            }
        } catch (error) {
            console.error('Failed to fetch job', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProposals = async () => {
        try {
            const response = await api.get(`/proposals/job/${id}`);
            setProposals(response.data);
        } catch (error) {
            console.error('Failed to fetch proposals', error);
        }
    };

    const handleSubmitProposal = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/proposals', {
                jobId: Number(id),
                price: Number(proposal.price),
                coverLetter: proposal.coverLetter
            });
            alert('Teklifiniz başarıyla gönderildi!');
            setProposal({ price: '', coverLetter: '' });
            // Optionally redirect or update UI
        } catch (error: any) {
            console.error('Failed to submit proposal', error);
            const message = error.response?.data?.message;
            const errorText = Array.isArray(message) ? message.join(', ') : (message || 'Teklif gönderilemedi.');
            alert(`Hata: ${errorText}`);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAcceptProposal = async (proposalId: number) => {
        if (!confirm('Bu teklifi kabul etmek istediğinize emin misiniz?')) return;
        try {
            await api.patch(`/proposals/${proposalId}/accept`);
            alert('Teklif kabul edildi! İş durumu güncellendi.');
            // Refresh Data
            // We need to pass the current user to fetchJobDetails since it expects it, 
            // or modify fetchJobDetails to use state if available, but passing user state is safer here.
            fetchJobDetails(user);
            fetchProposals();
        } catch (error) {
            console.error('Accept failed', error);
            alert('İşlem başarısız.');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bu ilanı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
        try {
            await api.delete(`/jobs/${id}`);
            alert('İlan silindi.');
            navigate('/dashboard');
        } catch (error) {
            console.error('Delete failed', error);
            alert('Silme işlemi başarısız.');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await api.patch(`/jobs/${id}`, { ...editJob, budget: Number(editJob.budget) });
            alert('İlan güncellendi!');
            setShowEditModal(false);
            fetchJobDetails(user);
        } catch (error) {
            console.error('Update failed', error);
            alert('Güncelleme başarısız.');
        } finally {
            setUpdating(false);
        }
    };

    // Initialize edit form when opening modal
    const openEditModal = () => {
        setEditJob({
            title: job.title,
            description: job.description,
            budget: job.budget,
            category: job.category,
            level: job.level
        });
        setShowEditModal(true);
    };

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
    if (!job) return <div className="p-8 text-center text-red-500">İlan bulunamadı.</div>;

    const isOwner = user?.role === 'CLIENT' && job.client?.id === user?.id;
    const isAdmin = user?.role === 'ADMIN';
    const isFreelancer = user?.role === 'FREELANCER';

    return (
        <div className="max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:bg-transparent hover:text-indigo-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri Dön
            </Button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {job.status === 'OPEN' ? 'Açık İlan' : 'Kapandı'}
                            </span>
                        </div>
                        {(isOwner || isAdmin) && (
                            <div className="flex gap-2">
                                {isOwner && (
                                    <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={openEditModal}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Düzenle
                                    </Button>
                                )}
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={handleDelete}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Sil
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                        <span className="flex items-center text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Bütçe: {job.budget} TL
                        </span>
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Son Tarih: {job.deadline}
                        </span>
                        <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            İşveren: {job.client?.fullName}
                        </span>
                    </div>

                    <div className="mt-8 prose max-w-none text-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">İş Tanımı</h3>
                        <p className="whitespace-pre-line">{job.description}</p>
                    </div>
                </div>
            </div>

            {/* Freelancer: Submit Proposal */}
            {isFreelancer && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">Teklif Ver</h2>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmitProposal} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Teklif Tutarı (TL)"
                                    type="number"
                                    value={proposal.price}
                                    onChange={(e) => setProposal({ ...proposal, price: e.target.value })}
                                    required
                                />

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ön Yazı</label>
                                <textarea
                                    className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500 h-32"
                                    placeholder="Neden bu iş için en uygun kişi sizsiniz?"
                                    value={proposal.coverLetter}
                                    onChange={(e) => setProposal({ ...proposal, coverLetter: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" isLoading={submitting} className="w-full md:w-auto">
                                    Teklifi Gönder
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Client: View Proposals */}
            {isOwner && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">Gelen Teklifler ({proposals.length})</h2>
                    {proposals.length === 0 ? (
                        <p className="text-gray-500">Henüz hiç teklif gelmemiş.</p>
                    ) : (
                        proposals.map((prop) => (
                            <div key={prop.id} className={`rounded-xl shadow-sm border p-6 ${prop.status === 'ACCEPTED' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                                            {prop.freelancer?.fullName?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{prop.freelancer?.fullName}</p>
                                            <p className="text-sm text-gray-500">Freelancer</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-indigo-600">{prop.price} TL</p>
                                    </div>
                                </div>
                                <div className="bg-white/50 p-4 rounded-lg text-sm text-gray-700 mb-4">
                                    {prop.coverLetter}
                                </div>
                                <div className="flex justify-end gap-3">
                                    {prop.status === 'ACCEPTED' ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold flex items-center">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Kabul Edildi
                                        </span>
                                    ) : prop.status === 'REJECTED' ? (
                                        <span className="px-3 py-1 bg-red-50 text-red-700 rounded-lg font-medium">
                                            Reddedildi
                                        </span>
                                    ) : job.status === 'OPEN' && (
                                        <>
                                            <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">Reddet</Button>
                                            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAcceptProposal(prop.id)}>Kabul Et</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-bold text-gray-900">İlanı Düzenle</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <Input label="İlan Başlığı" value={editJob.title} onChange={e => setEditJob({ ...editJob, title: e.target.value })} required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white" value={editJob.category} onChange={e => setEditJob({ ...editJob, category: e.target.value })} required>
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
                                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white" value={editJob.level} onChange={e => setEditJob({ ...editJob, level: e.target.value })} required>
                                            <option value="">Seçiniz</option>
                                            <option value="ENTRY">Başlangıç (Entry)</option>
                                            <option value="INTERMEDIATE">Orta (Intermediate)</option>
                                            <option value="EXPERT">Uzman (Expert)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Proje Açıklaması</label>
                                    <textarea className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[120px]" value={editJob.description} onChange={e => setEditJob({ ...editJob, description: e.target.value })} required />
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <Input label="Bütçe (TL)" type="number" value={editJob.budget} onChange={e => setEditJob({ ...editJob, budget: e.target.value })} required />
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>Vazgeç</Button>
                                    <Button type="submit" isLoading={updating}>Kaydet</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
