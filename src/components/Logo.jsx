import React from 'react';

const Logo = ({ size = 40, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0">
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="absolute top-1/2 right-1 w-1 h-1 bg-white/25 rounded-full"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative">
            <div className="flex flex-col items-start">
              <div className="w-1 bg-white rounded-full" style={{ height: size * 0.4 }}></div>
              <div className="w-3 h-1 bg-white rounded-full -mt-0.5"></div>
            </div>
            <div className="absolute -right-1 top-1/4 w-0 h-0 border-l-2 border-l-white border-y-2 border-y-transparent"></div>
          </div>
          <div className="ml-1 flex flex-col items-start">
            <div className="w-2.5 h-0.5 bg-white rounded-full"></div>
            <div className="w-1 h-2 bg-white rounded-full mt-0.5"></div>
            <div className="w-2 h-0.5 bg-white rounded-full -mt-1"></div>
            <div className="w-2.5 h-0.5 bg-white rounded-full mt-0.5"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default Logo;
