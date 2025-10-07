
import React from 'react';
import { PythonIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-2">
                <PythonIcon />
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                    Python Problem Solver AI
                </h1>
            </div>
            <p className="text-lg text-gray-400">
                Your personal AI-powered assistant for all things Python.
            </p>
        </header>
    );
};

export default Header;
