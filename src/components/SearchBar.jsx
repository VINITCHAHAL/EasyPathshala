import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, TrendingUp, X, ArrowUpRight } from 'lucide-react';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  suggestions, 
  searchHistory, 
  addToSearchHistory,
  placeholder = "Search courses, instructors, topics...",
  className = "",
  showSuggestions = true,
  onSearch 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const allSuggestions = [
    ...suggestions.map(item => ({ type: 'suggestion', text: item })),
    ...searchHistory.slice(0, 5).map(item => ({ type: 'history', text: item }))
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(allSuggestions[highlightedIndex].text);
        } else if (searchTerm.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    addToSearchHistory(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    if (onSearch) {
      onSearch(suggestion);
    } else {
      // Navigate to courses page with search term
      navigate('/courses', { state: { searchTerm: suggestion } });
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      addToSearchHistory(searchTerm);
      setIsOpen(false);
      
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        navigate('/courses', { state: { searchTerm } });
      }
    }
  };

  const clearInput = () => {
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search 
          size={18} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={clearInput}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && showSuggestions && (searchTerm || searchHistory.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {searchTerm && suggestions.length > 0 && (
            <div className="p-4 border-b border-white/10">
              <h4 className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
                <TrendingUp size={14} />
                Suggestions
              </h4>
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors flex items-center justify-between group ${
                    highlightedIndex === index ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="group-hover:text-emerald-400 transition-colors">
                    {suggestion}
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-emerald-400 transition-colors" />
                </button>
              ))}
            </div>
          )}

          {searchHistory.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-white/60 mb-3 flex items-center gap-2">
                <Clock size={14} />
                Recent Searches
              </h4>
              {searchHistory.slice(0, 5).map((item, index) => (
                <button
                  key={`history-${index}`}
                  onClick={() => handleSuggestionClick(item)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors flex items-center justify-between group ${
                    highlightedIndex === suggestions.length + index ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="group-hover:text-white transition-colors">
                    {item}
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          )}

          {searchTerm && suggestions.length === 0 && searchHistory.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-white/60 mb-2">No suggestions found</div>
              <button
                onClick={handleSearch}
                className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
              >
                Search for "{searchTerm}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
