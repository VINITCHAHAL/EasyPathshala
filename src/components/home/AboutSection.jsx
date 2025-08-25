import React from 'react';
import { Users, Target, Zap, Globe, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="py-20 bg-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
            <Users size={16} />
            <span>About EasyPathshala</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Mission</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            To create a digital pathshala that honors traditional learning wisdom while embracing modern technology, empowering every learner to discover their potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Target size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  Guru-Led Learning
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Learn from experienced gurus who blend traditional wisdom with modern teaching methodologies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-teal-400/50 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                  Interactive Pathshala
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Experience immersive learning through our digital pathshala with hands-on projects and practical wisdom.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-sky-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Globe size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  Global Community
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Join a worldwide sangam of learners sharing knowledge and growing together in wisdom.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-sky-400/50 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-sky-500 to-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Heart size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  Personalized Journey
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Get customized learning paths that respect your pace and honor your unique learning style.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
            <div className="space-y-6 text-white/80 leading-relaxed">
              <p>
                EasyPathshala was born from a deep respect for traditional learning and a vision for its evolution. We recognized that the timeless wisdom of the pathshala system needed to meet the digital age.
              </p>
              <p>
                Starting with the philosophy that every student deserves a guru and every guru deserves the tools to teach effectively, we've built a platform that honors the teacher-student relationship while leveraging cutting-edge technology.
              </p>
              <p>
                Today, we're proud to serve as a digital sangam where knowledge flows freely, where traditional wisdom meets contemporary needs, and where every learner can find their path to success.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-8 backdrop-blur-md border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-2">2020</div>
                  <div className="text-white/80 text-sm">Founded</div>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-teal-400 mb-2">50+</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">1M+</div>
                  <div className="text-white/80 text-sm">Hours Learned</div>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-sky-400 mb-2">98%</div>
                  <div className="text-white/80 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;