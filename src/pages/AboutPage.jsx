import React from 'react';
import { Users, Target, Award, Zap, BookOpen, Globe, Heart, TrendingUp } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '10K+', label: 'Students', icon: Users },
    { number: '500+', label: 'Courses', icon: BookOpen },
    { number: '50+', label: 'Expert Gurus', icon: Award },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
  ];

  const features = [
    {
      icon: Target,
      title: 'Guru-Led Learning',
      description: 'Learn from experienced gurus who blend traditional wisdom with modern teaching methodologies.',
    },
    {
      icon: Zap,
      title: 'Interactive Pathshala',
      description: 'Experience immersive learning through our digital pathshala with hands-on projects and practical wisdom.',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Join a worldwide sangam of learners sharing knowledge and growing together in wisdom.',
    },
    {
      icon: Heart,
      title: 'Personalized Journey',
      description: 'Get customized learning paths that respect your pace and honor your unique learning style.',
    },
  ];

  const team = [
    {
      name: 'Vinit Choudhary',
      role: 'Founder & Head Guru',
      image: '/assets/images/FounderVinit.jpeg',
      bio: 'Web Developer passionate about making traditional learning accessible to everyone.',
    },
    {
      name: 'Acharya Sharma',
      role: 'Chief Learning Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in traditional pedagogy and modern educational technology integration.',
    },
    {
      name: 'Priya Gupta',
      role: 'Lead Content Guru',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Dedicated educator specializing in making complex concepts simple and accessible.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About
            <span className="bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent"> EasyPathshala</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            We're on a mission to bridge ancient wisdom with modern learning, making quality education accessible to every seeker of knowledge, everywhere.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <Icon size={32} className="text-white/90 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              To create a digital pathshala that honors traditional learning wisdom while embracing modern technology, empowering every learner to discover their potential and achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  EasyPathshala was born from a deep respect for traditional learning and a vision for its evolution. In 2020, we recognized that the timeless wisdom of the pathshala system needed to meet the digital age, creating a bridge between ancient knowledge and modern accessibility.
                </p>
                <p>
                  Starting with the philosophy that every student deserves a guru and every guru deserves the tools to teach effectively, we've built a platform that honors the teacher-student relationship while leveraging cutting-edge technology to remove geographical and temporal barriers.
                </p>
                <p>
                  Today, we're proud to serve as a digital sangam where knowledge flows freely, where traditional wisdom meets contemporary needs, and where every learner can find their path to enlightenment and success.
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

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Gurus</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our diverse team of educators, technologists, and wisdom keepers is dedicated to creating the most meaningful learning experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:border-emerald-400/50 transition-all duration-300">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h3>
                <div className="text-emerald-400 text-sm font-medium mb-4">{member.role}</div>
                <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Learning Journey?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of seekers who are already transforming their lives through our pathshala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105">
              Start Learning
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
              Connect With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
