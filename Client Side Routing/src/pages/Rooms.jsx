import React from 'react';
import { Bed, Users, Star } from 'lucide-react';

const Rooms = () => {
    const rooms = [
        { id: 1, name: 'Deluxe Ocean View', type: 'Deluxe', price: 5500, status: 'Available', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000' },
        { id: 2, name: 'Standard King', type: 'Standard', price: 3000, status: 'Occupied', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000' },
        { id: 3, name: 'Presidential Suite', type: 'Suite', price: 9000, status: 'Available', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000' },
        { id: 4, name: 'Family Room', type: 'Family', price: 4500, status: 'Cleaning', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Room Management</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add New Room
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden">
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-800">{room.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${room.status === 'Available' ? 'bg-green-100 text-green-600' :
                                    room.status === 'Occupied' ? 'bg-red-100 text-red-600' :
                                        'bg-orange-100 text-orange-600'
                                    }`}>
                                    {room.status}
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mb-4">{room.type}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex items-center text-slate-500 text-sm">
                                    <Users size={16} className="mr-1" />
                                    <span>2-4</span>
                                </div>
                                <div className="font-bold text-blue-600">
                                    ₹{room.price}<span className="text-slate-400 text-sm font-normal">/night</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
