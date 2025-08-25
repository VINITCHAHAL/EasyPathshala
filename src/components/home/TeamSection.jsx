import React from 'react';
import { Users } from 'lucide-react';

const TeamSection = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
            <Users size={16} />
            <span>Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Gurus</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our diverse team of educators, technologists, and wisdom keepers is dedicated to creating the most meaningful learning experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-emerald-400/50 transition-all duration-300">
            <div className="relative mb-6">
              <img
                src="/assets/images/FounderVinit.jpeg"
                alt="Vinit Choudhary"
                className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              Vinit Choudhary
            </h3>
            <div className="text-emerald-400 text-sm font-medium mb-4">Founder & Head Guru</div>
            <p className="text-white/70 text-sm leading-relaxed">Web Developer passionate about making traditional learning accessible to everyone.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-teal-400/50 transition-all duration-300">
            <div className="relative mb-6">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                alt="Talib Mir"
                className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
              Talib Mir
            </h3>
            <div className="text-teal-400 text-sm font-medium mb-4">Chief Learning Officer</div>
            <p className="text-white/70 text-sm leading-relaxed">Expert in traditional pedagogy and modern educational technology integration.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-cyan-400/50 transition-all duration-300">
            <div className="relative mb-6">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
                alt="Priya Gupta"
                className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-sky-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              Priya Gupta
            </h3>
            <div className="text-cyan-400 text-sm font-medium mb-4">Lead Content Guru</div>
            <p className="text-white/70 text-sm leading-relaxed">Dedicated educator specializing in making complex concepts simple and accessible.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;