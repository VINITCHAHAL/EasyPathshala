import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Play, Clock, User, Filter, Star, TrendingUp, Award, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { sampleVideos, categories, levels } from '../data/videos';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    searchVideos,
    suggestions,
    searchHistory,
    addToSearchHistory
  } = useSearch();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state, setSearchTerm]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 text-center">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Show authentication required message if user is not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-white">Access Our Pathshala</h2>
              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                Our comprehensive course library is exclusively available to registered members of our pathshala community. 
                Join thousands of learners who are already transforming their lives through traditional wisdom and modern learning.
              </p>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">What awaits you in our Pathshala:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">500+</div>
                    <div className="text-white/60 text-sm">Video Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-400 mb-1">50+</div>
                    <div className="text-white/60 text-sm">Expert Gurus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">25+</div>
                    <div className="text-white/60 text-sm">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-400 mb-1">24/7</div>
                    <div className="text-white/60 text-sm">Access</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Popular Categories:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Programming', 'Data Science', 'Design', 'Business', 'Languages', 'Music'].map((category) => (
                    <span key={category} className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 text-sm rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <LogIn size={20} />
                  Login to Browse Courses
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  <User size={20} />
                  Join Our Pathshala
                </button>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-white/60 text-sm mb-4">
                  Already have an account? <button onClick={() => navigate('/login')} className="text-emerald-400 hover:text-emerald-300 font-medium">Sign in here</button>
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredVideos = useMemo(() => {

    let filtered = searchTerm ? searchVideos : sampleVideos;
    
    filtered = filtered.filter(video => {
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All Levels' || video.level === selectedLevel;
      return matchesCategory && matchesLevel;
    });

    if (sortBy === 'popular') {
      filtered = filtered.sort((a, b) => Math.random() - 0.5);
    } else if (sortBy === 'duration') {
      filtered = filtered.sort((a, b) => a.duration.localeCompare(b.duration));
    } else if (sortBy === 'relevance' && searchTerm) {

      filtered = filtered.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0));
    }

    return filtered;
  }, [searchVideos, sampleVideos, searchTerm, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
            <TrendingUp size={16} />
            <span>{searchTerm ? `Search Results` : '500+ Courses in Our Pathshala'}</span>
          </div>
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
            {searchTerm ? (
              <>
                Results for "
                <span className="bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent">
                  {searchTerm}
                </span>
                "
              </>
            ) : (
              <>
                Explore Our
                <span className="bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent"> Pathshala</span>
              </>
            )}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {searchTerm 
              ? `Found ${filteredVideos.length} courses matching your search criteria`
              : 'Discover wisdom through our comprehensive course library guided by expert gurus who blend traditional knowledge with modern skills.'
            }
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              suggestions={suggestions}
              searchHistory={searchHistory}
              addToSearchHistory={addToSearchHistory}
              placeholder="Search for wisdom, skills, or find your guru..."
              className="w-full"
              onSearch={(term) => {
                setSearchTerm(term);
                setSelectedCategory('All');
                setSelectedLevel('All Levels');
                setSortBy('relevance');
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[160px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[160px]"
                >
                  {levels.map(level => (
                    <option key={level} value={level} className="bg-slate-800 text-white">
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/80 text-sm font-medium">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[160px]"
                >
                  {searchTerm && <option value="relevance" className="bg-slate-800 text-white">Most Relevant</option>}
                  <option value="newest" className="bg-slate-800 text-white">Newest</option>
                  <option value="popular" className="bg-slate-800 text-white">Most Popular</option>
                  <option value="duration" className="bg-slate-800 text-white">Duration</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-white/80 font-medium">
                <span className="text-emerald-400 text-lg font-bold">{filteredVideos.length}</span> courses found
              </div>
              {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All Levels') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLevel('All Levels');
                    setSortBy('newest');
                  }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-xl hover:bg-white/20 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredVideos.map(video => (
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

                    {searchTerm && video.searchScore && (
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <Star size={10} fill="currentColor" />
                          MATCH
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

        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No courses found</h3>
              <p className="text-white/60 mb-6">
                {searchTerm 
                  ? `No courses match "${searchTerm}" with the selected filters. Try adjusting your search or filters.`
                  : 'Try adjusting your search to discover new wisdom in our pathshala.'
                }
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLevel('All Levels');
                  setSortBy('newest');
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
