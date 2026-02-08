import React, { useState, useEffect } from 'react';
import { Search, Filter, Pencil, Check, X, Trash2, Plus } from 'lucide-react';

const INITIAL_BOOKINGS = [
    { id: 1, name: 'John Doe', room: 'Deluxe King', checkIn: 'Dec 12, 2023', checkOut: 'Dec 15, 2023', status: 'Confirmed', initials: 'JD', color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Alice Smith', room: 'Executive Suite', checkIn: 'Dec 14, 2023', checkOut: 'Dec 18, 2023', status: 'Pending', initials: 'AS', color: 'bg-purple-100 text-purple-600' },
    { id: 3, name: 'Robert Johnson', room: 'Standard Twin', checkIn: 'Dec 15, 2023', checkOut: 'Dec 16, 2023', status: 'Confirmed', initials: 'RJ', color: 'bg-green-100 text-green-600' },
    { id: 4, name: 'Emily Davis', room: 'Deluxe King', checkIn: 'Dec 10, 2023', checkOut: 'Dec 14, 2023', status: 'Checked Out', initials: 'ED', color: 'bg-orange-100 text-orange-600' },
    { id: 5, name: 'Michael Brown', room: 'Family Suite', checkIn: 'Dec 20, 2023', checkOut: 'Dec 25, 2023', status: 'Confirmed', initials: 'MB', color: 'bg-indigo-100 text-indigo-600' },
];

const Bookings = () => {
    // Initialize state from localStorage or fallback to default
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem('hotel_bookings');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse bookings', e);
                return INITIAL_BOOKINGS;
            }
        }
        return INITIAL_BOOKINGS;
    });

    const [editingId, setEditingId] = useState(null);
    const [tempData, setTempData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    // Save to localStorage whenever bookings change
    useEffect(() => {
        localStorage.setItem('hotel_bookings', JSON.stringify(bookings));
    }, [bookings]);

    const startEditing = (booking) => {
        setEditingId(booking.id);
        setTempData({ ...booking });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setTempData({});
    };

    const saveEdit = (id) => {
        // Update initials based on new name
        const nameParts = tempData.name ? tempData.name.split(' ') : [];
        const initials = nameParts.length >= 2
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
            : nameParts.length === 1 ? nameParts[0].substring(0, 2).toUpperCase() : '??';

        const updatedData = { ...tempData, initials };

        setBookings(bookings.map(b =>
            b.id === id ? { ...b, ...updatedData } : b
        ));
        setEditingId(null);
    };

    const addNewBooking = () => {
        const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
        const newBooking = {
            id: newId,
            name: '',
            room: '',
            checkIn: '',
            checkOut: '',
            status: 'Pending',
            initials: 'New',
            color: 'bg-slate-100 text-slate-600'
        };

        // Add new booking to the start of the list
        setBookings([newBooking, ...bookings]);
        // Immediately start editing it
        startEditing(newBooking);
    };

    const deleteBooking = (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            setBookings(bookings.filter(b => b.id !== id));
            if (editingId === id) {
                cancelEditing();
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData(prev => ({ ...prev, [name]: value }));
    };

    // Filter bookings based on search query
    const filteredBookings = bookings.filter(booking =>
        booking.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper to highlight text
    const HighlightText = ({ text, highlight }) => {
        if (!highlight.trim() || !text) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);

        return (
            <span>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <span key={i} className="bg-yellow-200 text-slate-900 font-bold">{part}</span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-slate-800">All Bookings</h1>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search guest name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={addNewBooking}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                        <span>Add Booking</span>
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                        <Filter size={20} />
                        <span>Filter</span>
                    </button>

                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to reset all data to default?')) {
                                setBookings(INITIAL_BOOKINGS);
                                localStorage.removeItem('hotel_bookings');
                                setEditingId(null);
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 text-sm"
                        title="Reset all data"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Booking ID</th>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Guest Name</th>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Room Type</th>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Check In</th>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Check Out</th>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Status</th>
                                <th className="px-6 py-4 text-slate-500 font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-500">#BK-834{booking.id}</td>
                                        <td className="px-6 py-4 min-w-[200px]">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${booking.color}`}>
                                                    {booking.initials}
                                                </div>

                                                {editingId === booking.id ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Guest Name"
                                                        value={tempData.name}
                                                        onChange={handleChange}
                                                        className="border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span className="font-medium text-slate-800">
                                                        <HighlightText text={booking.name} highlight={searchQuery} />
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-slate-600 min-w-[150px]">
                                            {editingId === booking.id ? (
                                                <input
                                                    type="text"
                                                    name="room"
                                                    placeholder="Room Type"
                                                    value={tempData.room}
                                                    onChange={handleChange}
                                                    className="border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                                                />
                                            ) : (
                                                booking.room
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-slate-600 min-w-[130px]">
                                            {editingId === booking.id ? (
                                                <input
                                                    type="text"
                                                    name="checkIn"
                                                    placeholder="DD/MM/YYYY"
                                                    value={tempData.checkIn}
                                                    onChange={handleChange}
                                                    className="border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                                                />
                                            ) : (
                                                booking.checkIn
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-slate-600 min-w-[130px]">
                                            {editingId === booking.id ? (
                                                <input
                                                    type="text"
                                                    name="checkOut"
                                                    placeholder="DD/MM/YYYY"
                                                    value={tempData.checkOut}
                                                    onChange={handleChange}
                                                    className="border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                                                />
                                            ) : (
                                                booking.checkOut
                                            )}
                                        </td>

                                        <td className="px-6 py-4 min-w-[140px]">
                                            {editingId === booking.id ? (
                                                <select
                                                    name="status"
                                                    value={tempData.status}
                                                    onChange={handleChange}
                                                    className="border border-blue-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full bg-white"
                                                >
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Checked Out">Checked Out</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                                            booking.status === 'Checked Out' ? 'bg-slate-100 text-slate-600' :
                                                                'bg-red-100 text-red-600'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            {editingId === booking.id ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEdit(booking.id)}
                                                        className="p-1 hover:bg-green-100 text-green-600 rounded transition-colors"
                                                        title="Save"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => startEditing(booking)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors"
                                                    >
                                                        <Pencil size={16} />
                                                        <span className="hidden md:inline">Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteBooking(booking.id)}
                                                        className="text-red-400 hover:text-red-600 p-1"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colspan="7" className="px-6 py-8 text-center text-slate-500">
                                        No bookings found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
