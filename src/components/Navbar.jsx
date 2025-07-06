import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Info, LogIn, UserPlus, User, LogOut, Settings } from 'lucide-react';
import EasyPathshalaLogo from './EasyPathshalaLogo';
import SearchBar from './SearchBar';
import { useSearch } from '../hooks/useSearch';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    searchHistory,
    addToSearchHistory
  } = useSearch();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 backdrop-blur-md bg-opacity-95 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <EasyPathshalaLogo size={40} />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                EasyPathshala
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-white/20 text-emerald-400 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                suggestions={suggestions}
                searchHistory={searchHistory}
                addToSearchHistory={addToSearchHistory}
                placeholder="Search courses..."
                className="w-64"
              />
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                      alt={user?.fullName || user?.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-white font-medium">{user?.fullName || user?.username}</span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 
                                    sm:w-64 max-w-[calc(100vw-2rem)] 
                                    sm:right-0 right-0
                                    transform sm:translate-x-0 -translate-x-0">
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                            alt={user?.fullName || user?.username}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-white font-medium truncate">{user?.fullName || user?.username}</div>
                            <div className="text-white/60 text-sm truncate">{user?.email || user?.phone}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={18} className="flex-shrink-0" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings size={18} className="flex-shrink-0" />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                        >
                          <LogOut size={18} className="flex-shrink-0" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
                  >
                    <LogIn size={18} />
                    <span className="font-medium">Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-slate-800/95 to-gray-800/95 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-white/20 text-emerald-400'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Search Bar */}
              <div className="mt-4">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  suggestions={suggestions}
                  searchHistory={searchHistory}
                  addToSearchHistory={addToSearchHistory}
                  placeholder="Search courses..."
                  className="w-full"
                />
              </div>

              {/* Mobile Auth Section */}
              <div className="mt-6 pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl">
                      <img
                        src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                        alt={user?.fullName || user?.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-medium">{user?.fullName || user?.username}</div>
                        <div className="text-white/60 text-sm">{user?.email || user?.phone}</div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <User size={20} />
                      <span className="font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Settings size={20} />
                      <span className="font-medium">Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <LogOut size={20} />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <LogIn size={20} />
                      <span className="font-medium">Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      <UserPlus size={20} />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
