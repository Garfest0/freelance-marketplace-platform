
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, Briefcase, FileText, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export default function Layout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Panel', path: '/dashboard' },
        { icon: Briefcase, label: 'İş İlanları', path: '/jobs' },
        ...(user?.role === 'FREELANCER' ? [{ icon: FileText, label: 'Tekliflerim', path: '/proposals' }] : []),
        ...(user?.role === 'CLIENT' ? [] : []),

        { icon: User, label: 'Profilim', path: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:transform-none",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center px-6 border-b border-gray-200">
                        <Link to="/dashboard" className="flex items-center">
                            <Briefcase className="h-8 w-8 text-indigo-600 mr-2" />
                            <span className="text-xl font-bold text-gray-900">WorkFlow</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                    location.pathname === item.path
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 mr-3", location.pathname === item.path ? "text-indigo-600" : "text-gray-400")} />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center mb-4 px-2">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                {user?.fullName?.charAt(0) || 'U'}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                                <p className="text-xs text-gray-500">
                                    {user?.role === 'ADMIN' ? 'Yönetici (Admin)' : user?.role === 'CLIENT' ? 'İşveren' : 'Freelancer'}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Çıkış Yap
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link to="/dashboard">
                        <span className="ml-4 text-lg font-bold text-gray-900">WorkFlow</span>
                    </Link>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
