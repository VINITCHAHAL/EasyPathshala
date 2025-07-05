import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { ArrowLeft, User, Clock, BookOpen, Tag, Star, Award, Share2, Heart } from 'lucide-react';
import { sampleVideos } from '../data/videos';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const foundVideo = sampleVideos.find(v => v.id === videoId);
    setVideo(foundVideo);
  }, [videoId]);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <h2 className="text-3xl font-bold mb-4">Video not found</h2>
              <p className="text-white/70 mb-6">The video you're looking for doesn't exist or has been removed.</p>
              <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = duration ? (playedSeconds / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="mb-6">
          <Link to="/courses" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

          <div className="xl:col-span-3">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
              <div className="relative aspect-video bg-black">
                <ReactPlayer
                  url={video.videoUrl}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls={true}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    }
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-sm text-white/80">
                  <span>{formatTime(playedSeconds)} / {formatTime(duration)}</span>
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold">
                    {Math.round(progressPercentage)}% complete
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 mt-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {video.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white/80">
                      <User size={18} />
                      <span className="font-medium">{video.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock size={18} />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Tag size={18} />
                      <span>{video.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="text-white/80 ml-1">4.8 (1,234 reviews)</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                      video.level === 'Beginner' ? 'bg-green-500' :
                      video.level === 'Intermediate' ? 'bg-orange-500' : 'bg-red-500'
                    }`}>
                      {video.level}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full">
                      {video.category}
                    </span>
                    <div className="flex items-center gap-1 text-cyan-400">
                      <Award size={16} />
                      <span className="text-sm font-medium">Certificate Available</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                    <Heart size={20} className="text-white group-hover:text-red-400 transition-colors" />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                    <Share2 size={20} className="text-white group-hover:text-cyan-400 transition-colors" />
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-cyan-400" />
                  Course Description
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">{video.description}</p>
                
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award size={20} className="text-purple-400" />
                  What You'll Learn
                </h3>
                <p className="text-white/80 leading-relaxed">{video.summary}</p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Completion</span>
                  <span className="text-cyan-400 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>{formatTime(playedSeconds)} watched</span>
                  <span>{formatTime(duration - playedSeconds)} remaining</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">More from {video.category}</h3>
              <div className="space-y-4">
                {sampleVideos
                  .filter(v => v.category === video.category && v.id !== video.id)
                  .slice(0, 4)
                  .map(relatedVideo => (
                    <Link 
                      key={relatedVideo.id} 
                      to={`/video/${relatedVideo.id}`}
                      className="flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group border border-transparent hover:border-cyan-400/30"
                    >
                      <img 
                        src={relatedVideo.thumbnail} 
                        alt={relatedVideo.title}
                        className="w-20 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors mb-1">
                          {relatedVideo.title}
                        </h4>
                        <p className="text-xs text-white/60 mb-1">{relatedVideo.instructor}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50">{relatedVideo.duration}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            relatedVideo.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            relatedVideo.level === 'Intermediate' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {relatedVideo.level}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Course Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]">
                  Download Certificate
                </button>
                <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                  Add to Favorites
                </button>
                <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                  Share Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
