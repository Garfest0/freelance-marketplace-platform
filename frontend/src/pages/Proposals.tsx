import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Clock, DollarSign, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Proposals() {
    const [proposals, setProposals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        try {
            const response = await api.get('/proposals/me');
            setProposals(response.data);
        } catch (error) {
            console.error('Failed to fetch proposals', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText className="mr-3 h-6 w-6 text-indigo-600" />
                    Tekliflerim
                </h1>
                <p className="text-gray-500 mt-1">Yaptığınız başvuruların takibi.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
                    ) : proposals.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <FileText className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                            <p>Henüz hiç teklif vermediniz.</p>
                            <Link to="/jobs">
                                <Button variant="outline" className="mt-4">İlanlara Göz At</Button>
                            </Link>
                        </div>
                    ) : (
                        proposals.map((proposal) => (
                            <div key={proposal.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {proposal.job.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span className="font-medium text-indigo-600">
                                                {proposal.price} TL
                                            </span>
                                            <span className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                                {proposal.duration} Günde Teslim
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            "{proposal.coverLetter}"
                                        </p>
                                    </div>
                                    <div>
                                        {/* Status Badge can be expanded later */}
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Bekliyor
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
