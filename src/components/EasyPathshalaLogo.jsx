import React from 'react';

const EasyPathshalaLogo = ({ size = 40, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute -inset-3 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-300 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg">
        <div className="absolute inset-0">
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
          <div className="absolute top-2 right-1.5 w-1 h-1 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1.5 left-2 w-1 h-1 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
          <div className="absolute top-0 left-1/4 w-0.5 h-2 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-0.5 h-2 bg-white/15 rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative mb-1">
            <div className="w-1 h-2 bg-gradient-to-t from-amber-200 to-yellow-100 rounded-full mx-auto"></div>
            <div className="w-3 h-1 bg-gradient-to-b from-amber-100 to-orange-200 rounded-full -mt-0.5"></div>
          </div>
          <div className="relative">
            <div className="flex">
              <div className="w-2 h-2.5 bg-slate-50/95 rounded-l-sm border-r border-slate-100/60"></div>
              <div className="w-2 h-2.5 bg-white/98 rounded-r-sm"></div>
            </div>
            <div className="absolute top-0.5 left-0.5 w-1 h-0.5 bg-slate-400/30 rounded-full"></div>
            <div className="absolute top-1 left-0.5 w-0.5 h-0.5 bg-slate-400/25 rounded-full"></div>
            <div className="absolute top-0.5 right-0.5 w-1 h-0.5 bg-slate-400/30 rounded-full"></div>
            <div className="absolute top-1 right-0.5 w-0.5 h-0.5 bg-slate-400/25 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-6 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 -translate-y-2"></div>
            <div className="absolute w-6 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent -rotate-45 -translate-y-2"></div>
            <div className="absolute w-5 h-0.5 bg-gradient-to-r from-transparent via-white/18 to-transparent -translate-y-2"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
        <div className="absolute inset-0 rounded-2xl border border-white/15"></div>
      </div>
    </div>
  );
};

export default EasyPathshalaLogo;
