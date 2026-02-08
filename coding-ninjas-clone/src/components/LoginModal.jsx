import React, { useState } from 'react';
import loginLogo from '../assets/login-logo.png';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center md:items-start md:justify-end md:p-0"
            onClick={handleBackdropClick}
        >
            {/* Modal Content - Slide in from right or centered depending on preference, logic here mimics the 'drawer' style or centered modal often used */}
            <div className="bg-white w-full max-w-[400px] h-full md:h-auto md:min-h-screen md:w-[450px] p-8 shadow-2xl relative animate-slide-in-right flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <img src={loginLogo} alt="Coding Ninjas" className="h-12 md:h-14 object-contain" />
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 font-bold text-sm flex items-center transition"
                    >
                        Close <span className="text-xl ml-2 font-light text-gray-400">&times;</span>
                    </button>
                </div>

                {/* Body */}
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Login with</h2>

                <div className="space-y-4 mb-8">
                    <button
                        onClick={() => onLogin('Google')}
                        className="w-full flex items-center justify-center space-x-3 border-2 border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-6 h-6" />
                        <span>Google</span>
                    </button>

                    <button
                        onClick={() => onLogin('Naukri')}
                        className="w-full flex items-center justify-center space-x-3 border-2 border-gray-200 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                        {/* Placeholder for Naukri logo - using blue generic icon */}
                        <div className="w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs font-serif italic">N</div>
                        <span>Naukri</span>
                    </button>
                </div>

                <div className="relative flex py-5 items-center mb-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-semibold">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-ninja-orange mb-1">Enter email</label>
                    <input
                        type="email"
                        placeholder="Enter email here"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-ninja-orange transition"
                    />
                </div>

                <button
                    disabled={!email}
                    onClick={() => onLogin('Email')}
                    className={`w-full py-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition bg-ninja-orange text-white hover:bg-orange-600 ${!email ? 'opacity-50 cursor-not-allowed' : 'shadow-lg shadow-ninja-orange/30'}`}
                >
                    <span>Continue</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>

            </div>
        </div>
    );
};

export default LoginModal;
