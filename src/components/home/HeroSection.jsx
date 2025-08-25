import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import SearchBar from '../SearchBar';

const HeroSection = ({ 
  searchTerm, 
  setSearchTerm, 
  suggestions, 
  searchHistory, 
  addToSearchHistory 
}) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white/80 text-sm font-medium mb-8">
            <Sparkles size={16} className="text-emerald-400" />
            <span>Welcome to Traditional Learning Made Easy</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Learn
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent"> Wisely</span>
            <br />
            Grow
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-300 bg-clip-text text-transparent"> Mindfully</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
            Experience the perfect blend of traditional wisdom and modern learning with our 
            <span className="text-emerald-400 font-semibold"> expert-guided pathshala</span> designed for today's learners.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              suggestions={suggestions}
              searchHistory={searchHistory}
              addToSearchHistory={addToSearchHistory}
              placeholder="What would you like to learn today?"
              className="w-full"
              onSearch={(term) => {
                setSearchTerm(term);
              }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/courses"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Explore Courses
            </Link>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">10K+</div>
              <div className="text-white/60 text-sm">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">500+</div>
              <div className="text-white/60 text-sm">Video Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-white/60 text-sm">Expert Gurus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-400 mb-2">95%</div>
              <div className="text-white/60 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;