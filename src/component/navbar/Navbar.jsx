import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo*/}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            FUTUREPLIX
                        </Link>
                    </div>

                    {/* Desktop Menu Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/home" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                            About
                        </Link>
                        <Link to="/model" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                            Model
                        </Link>
                    </div>

                    {/* Desktop Auth Buttons (Login & Signup) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login"
                            className="text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Login
                        </Link>
                        <Link to="/signup"
                            className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-lg"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
                    <Link to="/home"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                        Home
                    </Link>
                    <Link to="/about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                        About
                    </Link>
                    <Link to="/model"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    >
                        Model
                    </Link>
                    <div className="border-t border-gray-200 pt-3 mt-3 flex flex-col space-y-2">
                        <Link to="/login"
                            className="text-center w-full px-4 py-2 text-indigo-600 font-medium border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        >
                            Login
                        </Link>
                        <Link to="/signup"
                            className="text-center w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;


