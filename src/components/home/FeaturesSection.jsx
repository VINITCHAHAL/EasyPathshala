import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Award, User } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Why Choose EasyPathshala?</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We blend ancient wisdom with modern technology to create the perfect learning experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-emerald-400/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Play size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Interactive Learning</h3>
            <p className="text-white/70">Engage with high-quality content that combines traditional teaching methods with modern interactivity.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-teal-400/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Certified Learning</h3>
            <p className="text-white/70">Earn recognized certificates that honor both traditional knowledge and modern skills.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <User size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Expert Gurus</h3>
            <p className="text-white/70">Learn from experienced teachers who understand both traditional wisdom and contemporary needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;