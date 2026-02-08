import React from 'react';

const StatCard = ({ title, value, icon, trend, trendUp }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
                <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                {icon}
            </div>
        </div>
        {trend && (
            <div className={`mt-4 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
            </div>
        )}
    </div>
);

export default StatCard;
