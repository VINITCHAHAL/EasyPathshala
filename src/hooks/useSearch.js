import { useState, useMemo, useEffect } from 'react';
import { sampleVideos } from '../data/videos';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  const addToSearchHistory = (term) => {
    if (term.trim() && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const generateSuggestions = (input) => {
    if (!input.trim()) return [];
    
    const suggestions = new Set();
    const lowerInput = input.toLowerCase();
    
    sampleVideos.forEach(video => {
      if (video.title.toLowerCase().includes(lowerInput)) {
        suggestions.add(video.title);
      }
      
      if (video.category.toLowerCase().includes(lowerInput)) {
        suggestions.add(video.category);
      }
      
      if (video.instructor.toLowerCase().includes(lowerInput)) {
        suggestions.add(video.instructor);
      }
      
      const words = video.description.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.includes(lowerInput) && word.length > 2) {
          suggestions.add(word);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  };

  const searchVideos = useMemo(() => {
    if (!searchTerm.trim()) return sampleVideos;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const searchWords = lowerSearchTerm.split(' ').filter(word => word.length > 0);
    
    const scoredVideos = sampleVideos.map(video => {
      let score = 0;
      const lowerTitle = video.title.toLowerCase();
      const lowerDescription = video.description.toLowerCase();
      const lowerInstructor = video.instructor.toLowerCase();
      const lowerCategory = video.category.toLowerCase();
      
      searchWords.forEach(word => {
        if (lowerTitle.includes(word)) {
          score += lowerTitle.startsWith(word) ? 10 : 5;
        }
        
        if (lowerCategory.includes(word)) {
          score += 8;
        }
        
        if (lowerInstructor.includes(word)) {
          score += 6;
        }
        
        if (lowerDescription.includes(word)) {
          score += 3;
        }
        
        if (video.level.toLowerCase().includes(word)) {
          score += 4;
        }
      });
      
      return { ...video, searchScore: score };
    });
    
    return scoredVideos
      .filter(video => video.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);
  }, [searchTerm]);

  useEffect(() => {
    const newSuggestions = generateSuggestions(searchTerm);
    setSuggestions(newSuggestions);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return {
    searchTerm,
    setSearchTerm,
    searchVideos,
    suggestions,
    searchHistory,
    addToSearchHistory,
    clearSearch,
    clearSearchHistory,
  };
};
