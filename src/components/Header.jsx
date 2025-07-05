import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 text-blue-400 text-xl font-bold hover:text-cyan-400 transition-colors">
          <Play size={28} />
          <span>EasyPathshala</span>
        </Link>
        
        <div className="flex-1 max-w-lg relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for courses, topics, or instructors..."
            className="w-full pl-12 pr-4 py-3 bg-slate-800 text-white rounded-full border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:text-blue-400 font-medium relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/courses" className="text-white hover:text-blue-400 font-medium relative group">
            Courses
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/about" className="text-white hover:text-blue-400 font-medium relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        
        <button className="md:hidden p-2 text-white hover:text-blue-400 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;