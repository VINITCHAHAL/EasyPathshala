import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, User, ArrowRight, Star, Sparkles, TrendingUp, Award, BookOpen, Users, Target, Zap, Globe, Heart, Mail, Phone, MapPin, Send } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchVideos,
    suggestions,
    searchHistory,
    addToSearchHistory
  } = useSearch();

  const { user, isAuthenticated, isLoading } = useAuth();

  const displayVideos = searchTerm ? searchVideos.slice(0, 6) : searchVideos.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      
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

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
              <TrendingUp size={16} />
              <span>{searchTerm ? 'Search Results' : 'Most Popular'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {searchTerm ? (
                <>
                  Results for "
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {searchTerm}
                  </span>
                  "
                </>
              ) : (
                <>
                  Featured
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Courses</span>
                </>
              )}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {searchTerm 
                ? `Found ${searchVideos.length} courses matching your search`
                : 'Begin your learning journey with our most loved and highly-rated courses from our pathshala'
              }
            </p>
          </div>

          {displayVideos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayVideos.map((video, index) => (
                  <div key={video.id} className="group relative">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
                      <Link to={`/video/${video.id}`}>
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                              <Play size={28} className="text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                            <Clock size={12} />
                            {video.duration}
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                              video.level === 'Beginner' ? 'bg-green-500/80' :
                              video.level === 'Intermediate' ? 'bg-orange-500/80' : 'bg-red-500/80'
                            }`}>
                              {video.level}
                            </span>
                          </div>
                          {!searchTerm && index < 3 && (
                            <div className="absolute bottom-4 left-4">
                              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <Star size={10} fill="currentColor" />
                                POPULAR
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium rounded-full">
                              {video.category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star size={12} fill="currentColor" />
                              <span className="text-xs text-white/60">4.8</span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-white/60 text-sm mb-4 line-clamp-2">
                            {video.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <User size={14} />
                              <span>{video.instructor}</span>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-400">
                              <Award size={14} />
                              <span className="text-xs">Certificate</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                {searchTerm ? (
                  <Link 
                    to="/courses"
                    state={{ searchTerm }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen size={20} />
                    View All {searchVideos.length} Results
                    <ArrowRight size={20} />
                  </Link>
                ) : (
                  <Link 
                    to="/courses"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen size={20} />
                    View All Courses
                    <ArrowRight size={20} />
                  </Link>
                )}
              </div>
            </>
          ) : searchTerm ? (
            <div className="text-center py-20">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No courses found</h3>
                <p className="text-white/60 mb-6">We couldn't find any courses matching "{searchTerm}". Try searching for something else.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {!searchTerm && (
        <>
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

          <div className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
                  <Mail size={16} />
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Contact
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Us</span>
                </h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Ready to start your learning journey? Have questions about our pathshala? We're here to help you every step of the way.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
                {/* Contact Info Cards */}
                <div className="space-y-6 sm:space-y-8 flex flex-col h-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group flex-1">
                    <div className="flex items-start gap-4 h-full">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Mail size={20} className="text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          Email Us
                        </h3>
                        <p className="text-white/70 mb-2 text-sm sm:text-base">Send us your questions anytime</p>
                        <a 
                          href="mailto:support@easypathshala.com" 
                          className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm sm:text-base break-all"
                        >
                          support@easypathshala.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-teal-400/50 transition-all duration-300 group flex-1">
                    <div className="flex items-start gap-4 h-full">
                      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <Phone size={20} className="text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                          Call Us
                        </h3>
                        <p className="text-white/70 mb-2 text-sm sm:text-base">Available Mon-Fri, 9am-6pm IST</p>
                        <a 
                          href="tel:+911234567890" 
                          className="text-teal-400 hover:text-teal-300 transition-colors text-sm sm:text-base"
                        >
                          +91 12345 67890
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group flex-1">
                    <div className="flex items-start gap-4 h-full">
                      <div className="bg-gradient-to-r from-cyan-500 to-sky-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <MapPin size={20} className="text-white sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          Visit Us
                        </h3>
                        <p className="text-white/70 mb-2 text-sm sm:text-base">Come say hello at our office</p>
                        <address className="text-cyan-400 not-italic text-sm sm:text-base">
                          EasyPathshala HQ<br />
                          123 Learning Street<br />
                          Knowledge City, India 110001
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 h-full flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Send us a Message</h3>
                  <form className="space-y-4 sm:space-y-6 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full h-full min-h-[120px] px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 resize-none text-sm sm:text-base"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-auto"
                    >
                      <Send size={18} className="sm:w-5 sm:h-5" />
                      Send Message
                    </button>
                  </form>
                </div>
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
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Start Learning
                </Link>
                <Link
                  to="/about"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {!searchTerm && (
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
      )}
    </div>
  );
};

export default HomePage;
