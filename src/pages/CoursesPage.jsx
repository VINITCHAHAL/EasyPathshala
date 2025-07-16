import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Clock, User, Filter, Star, TrendingUp, Award } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { sampleVideos, categories, levels } from '../data/videos';

const CoursesPage = () => {
  const location = useLocation();
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    searchHistory,
    addToSearchHistory
  } = useSearch();
  
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state, setSearchTerm]);

  useEffect(() => {
    // Filter and sort videos based on current criteria
    let filteredCourses = [...sampleVideos];

    // Apply category filter
    if (selectedCategory !== 'All') {
      filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
    }

    // Apply level filter
    if (selectedLevel !== 'All Levels') {
      filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filteredCourses.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'popular':
          return Math.random() - 0.5; // Simulated popularity
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });

    setCourses(filteredCourses);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

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
              ? `Found ${courses.length} courses matching your search criteria`
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
                <span className="text-emerald-400 text-lg font-bold">{courses.length}</span> courses found
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
          {courses.map(course => (
            <div key={course.id} className="group relative">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
                <Link to={`/video/${course.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
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
                      {course.duration}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        course.level === 'Beginner' ? 'bg-green-500/80' :
                        course.level === 'Intermediate' ? 'bg-orange-500/80' : 'bg-red-500/80'
                      }`}>
                        {course.level}
                      </span>
                    </div>

                    {searchTerm && course.searchScore && (
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
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs text-white/60">4.8</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <User size={14} />
                        <span>{course.instructor}</span>
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

        {courses.length === 0 && (
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
