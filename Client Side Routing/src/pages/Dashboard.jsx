import React, { useState, useEffect } from 'react';
import StatCard from '../components/DashboardStats';
import { Users, BedDouble, DollarSign, CalendarCheck } from 'lucide-react';

const INITIAL_BOOKINGS = [
    { id: 1, name: 'John Doe', room: 'Deluxe King', checkIn: 'Dec 12, 2023', checkOut: 'Dec 15, 2023', status: 'Confirmed', initials: 'JD', color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Alice Smith', room: 'Executive Suite', checkIn: 'Dec 14, 2023', checkOut: 'Dec 18, 2023', status: 'Pending', initials: 'AS', color: 'bg-purple-100 text-purple-600' },
    { id: 3, name: 'Robert Johnson', room: 'Standard Twin', checkIn: 'Dec 15, 2023', checkOut: 'Dec 16, 2023', status: 'Confirmed', initials: 'RJ', color: 'bg-green-100 text-green-600' },
    { id: 4, name: 'Emily Davis', room: 'Deluxe King', checkIn: 'Dec 10, 2023', checkOut: 'Dec 14, 2023', status: 'Checked Out', initials: 'ED', color: 'bg-orange-100 text-orange-600' },
    { id: 5, name: 'Michael Brown', room: 'Family Suite', checkIn: 'Dec 20, 2023', checkOut: 'Dec 25, 2023', status: 'Confirmed', initials: 'MB', color: 'bg-indigo-100 text-indigo-600' },
];

const Dashboard = () => {
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

    useEffect(() => {
        const loadBookings = () => {
            const saved = localStorage.getItem('hotel_bookings');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setBookings(parsed);
                } catch (e) {
                    console.error('Failed to parse bookings on dashboard', e);
                }
            }
        };

        loadBookings();

        // Listen for storage changes to update in real-time if multiple tabs are open
        // Or simply if the user navigates back and forth (React state preserves component, but strict mode or remount might refetch)
        window.addEventListener('storage', loadBookings);
        return () => window.removeEventListener('storage', loadBookings);
    }, []);

    // Get the first 5 bookings to show as "Recent"
    const recentBookings = bookings.slice(0, 5);

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Bookings"
                    value={bookings.length.toString()}
                    icon={<CalendarCheck size={24} />}
                    trend="+12.5% vs last month"
                    trendUp={true}
                />
                <StatCard
                    title="Occupancy Rate"
                    value="84%"
                    icon={<BedDouble size={24} />}
                    trend="+4.3% vs last month"
                    trendUp={true}
                />
                <StatCard
                    title="Total Revenue"
                    value="$48,200"
                    icon={<DollarSign size={24} />}
                    trend="+8.2% vs last month"
                    trendUp={true}
                />
                <StatCard
                    title="New Guests"
                    value="156"
                    icon={<Users size={24} />}
                    trend="-2.1% vs last month"
                    trendUp={false}
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="pb-3 text-slate-500 font-medium text-sm">Guest</th>
                                <th className="pb-3 text-slate-500 font-medium text-sm">Room</th>
                                <th className="pb-3 text-slate-500 font-medium text-sm">Check In</th>
                                <th className="pb-3 text-slate-500 font-medium text-sm">Check Out</th>
                                <th className="pb-3 text-slate-500 font-medium text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recentBookings.map((booking) => (
                                <tr key={booking.id} className="group hover:bg-slate-50">
                                    <td className="py-3 text-slate-800 font-medium">{booking.name}</td>
                                    <td className="py-3 text-slate-600">{booking.room}</td>
                                    <td className="py-3 text-slate-600">{booking.checkIn}</td>
                                    <td className="py-3 text-slate-600">{booking.checkOut}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                                    booking.status === 'Checked Out' ? 'bg-slate-100 text-slate-600' :
                                                        'bg-red-100 text-red-600'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
