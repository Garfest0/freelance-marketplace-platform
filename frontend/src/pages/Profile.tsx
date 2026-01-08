import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';


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

                            {/* Selected Skills Chips */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.skillIds.map(id => {
                                    const skill = skills.find(s => s.id === id);
                                    if (!skill) return null;
                                    return (
                                        <span key={id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                            {skill.name}
                                            <button
                                                type="button"
                                                onClick={() => toggleSkill(id)}
                                                className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:text-indigo-600 focus:outline-none"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>

                            {/* Input for adding new skills */}
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Yetenek ekle (Örn: React, Photoshop) ve Enter'a bas..."
                                    onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = e.currentTarget.value.trim();
                                            if (!val) return;

                                            // Check if already in all skills list
                                            let skill = skills.find(s => s.name.toLowerCase() === val.toLowerCase());

                                            if (!skill) {
                                                // Create new skill
                                                try {
                                                    const res = await api.post('/skills', { name: val });
                                                    skill = res.data;
                                                    setSkills(prev => [...prev, skill!]);
                                                } catch (err) {
                                                    console.error("Failed to create skill", err);
                                                    return;
                                                }
                                            }

                                            if (skill && !formData.skillIds.includes(skill.id)) {
                                                toggleSkill(skill.id);
                                            }
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-4 border-t border-gray-100">


                        <Button type="submit" isLoading={saving}>
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
