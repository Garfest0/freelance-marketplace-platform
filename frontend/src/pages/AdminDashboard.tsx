import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Users, Briefcase, Trash2, Shield, FileText } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, jobs: 0, proposals: 0 });
    const [users, setUsers] = useState<any[]>([]);
    const [proposals, setProposals] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'users' | 'proposals'>('users');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, jobsRes, proposalsRes] = await Promise.all([
                api.get('/users'),
                api.get('/jobs'),
                api.get('/proposals/admin/all').catch(() => ({ data: [] })) // Fallback if endpoint fails initially
            ]);
            setUsers(usersRes.data);
            setProposals(proposalsRes.data);
            setStats({
                users: usersRes.data.length,
                jobs: jobsRes.data.length,
                proposals: proposalsRes.data.length
            });
        } catch (error) {
            console.error('Admin data fetch failed', error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (!confirm('Kullanıcıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(u => u.id !== id));
            setStats(prev => ({ ...prev, users: prev.users - 1 }));
        } catch (error) {
            console.error('Delete failed', error);
            alert('Silme işlemi başarısız.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Shield className="mr-3 h-8 w-8 text-red-600" />
                    Admin Paneli
                </h1>
                <p className="text-gray-500 mt-1">Sistem yönetimi ve moderasyon.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.users}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                        <Users className="h-8 w-8" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Toplam İlan</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.jobs}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                        <Briefcase className="h-8 w-8" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Toplam Teklif</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.proposals}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                        <FileText className="h-8 w-8" />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Kullanıcılar
                </button>
                <button
                    onClick={() => setActiveTab('proposals')}
                    className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === 'proposals' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Tüm Teklifler
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {activeTab === 'users' ? (
                    <>
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900">Kullanıcı Listesi</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Ad Soyad</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Rol</th>
                                        <th className="px-6 py-3 text-right">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-gray-500">#{user.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{user.fullName}</td>
                                            <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                                                    user.role === 'CLIENT' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {user.role !== 'ADMIN' && (
                                                    <Button
                                                        variant="outline"
                                                        className="text-red-600 hover:bg-red-50 border-red-200 h-8 px-3"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Sil
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900">Tüm Teklifler</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Freelancer</th>
                                        <th className="px-6 py-3">İlan</th>
                                        <th className="px-6 py-3">Fiyat</th>
                                        <th className="px-6 py-3">Durum</th>
                                        <th className="px-6 py-3">Ön Yazı</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {proposals.map(prop => (
                                        <tr key={prop.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-gray-500">#{prop.id}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{prop.freelancer?.fullName}</td>
                                            <td className="px-6 py-4 text-indigo-600">{prop.job?.title}</td>
                                            <td className="px-6 py-4 font-bold">{prop.price} TL</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${prop.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                    prop.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {prop.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 truncate max-w-xs" title={prop.coverLetter}>
                                                {prop.coverLetter.substring(0, 50)}...
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
