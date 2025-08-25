import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
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
  );
};

export default CallToActionSection;