import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { User as UserIcon, Save } from 'lucide-react';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({ bio: '', skillIds: [] as number[] });

    useEffect(() => {
        fetchProfile();
        fetchSkills();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/users/me');
            setUser(response.data);
            setFormData({
                bio: response.data.bio || '',
                skillIds: response.data.skills ? response.data.skills.map((s: any) => s.id) : []
            });
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSkills = async () => {
        try {
            const response = await api.get('/skills');
            setSkills(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.patch('/users/profile', formData);
            alert('Profil güncellendi!');
            fetchProfile();
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Güncelleme başarısız.');
        } finally {
            setSaving(false);
        }
    };

    const toggleSkill = (skillId: number) => {
        setFormData(prev => {
            const exists = prev.skillIds.includes(skillId);
            if (exists) {
                return { ...prev, skillIds: prev.skillIds.filter(id => id !== skillId) };
            } else {
                return { ...prev, skillIds: [...prev.skillIds, skillId] };
            }
        });
    };

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                    <UserIcon className="mr-2 h-5 w-5" />
                    Profilim
                </h1>
            </div>

            <div className="p-6 md:p-8">
                <div className="flex items-center mb-8">
                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl font-bold mr-6">
                        {user?.fullName?.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user?.fullName}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${user?.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                            {user?.role === 'ADMIN' ? 'Yönetici (Admin)' : user?.role === 'CLIENT' ? 'İşveren' : 'Freelancer'}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biyografi</label>
                        <textarea
                            className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500 h-32"
                            placeholder="Kendinizden bahsedin..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    {user?.role === 'FREELANCER' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Yetenekler</label>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <button
                                        key={skill.id}
                                        type="button"
                                        onClick={() => toggleSkill(skill.id)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${formData.skillIds.includes(skill.id)
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {skill.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-4 border-t border-gray-100">


                        <Button type="submit" isLoading={saving}>
                            <Save className="h-4 w-4 mr-2" />
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
