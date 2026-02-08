import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BedDouble, CalendarDays, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/rooms', icon: <BedDouble size={20} />, label: 'Rooms' },
        { path: '/bookings', icon: <CalendarDays size={20} />, label: 'Bookings' },
    ];

    const handleLogout = () => {
        // Here you would typically clear auth tokens
        navigate('/login');
    };

    return (
        <div className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 flex flex-col p-4">
            <div className="mb-8 p-2">
                <h1 className="text-2xl font-bold text-blue-400">HotelAdmin</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors mt-auto"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
