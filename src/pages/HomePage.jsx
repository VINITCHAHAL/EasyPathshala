import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CourseGrid from '../components/home/CourseGrid';
import AboutSection from '../components/home/AboutSection';
import TeamSection from '../components/home/TeamSection';
import ContactSection from '../components/home/ContactSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CallToActionSection from '../components/home/CallToActionSection';
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
      <HeroSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        searchHistory={searchHistory}
        addToSearchHistory={addToSearchHistory}
      />
      
      <CourseGrid 
        displayVideos={displayVideos}
        searchTerm={searchTerm}
        searchVideos={searchVideos}
        setSearchTerm={setSearchTerm}
      />
      
      {!searchTerm && (
        <>
          <AboutSection />
          <TeamSection />
          <ContactSection />
          <CallToActionSection />
          <FeaturesSection />
        </>
      )}
    </div>
  );
};

export default HomePage;
