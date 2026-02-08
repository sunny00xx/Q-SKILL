import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-slate-50 overflow-x-hidden w-full">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 w-full max-w-[calc(100vw-16rem)]">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
