"use client";

import React, { useState, useRef, useEffect } from "react";
import GlobalCard from "./cards/global-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  MoreVertical,
  Radio,
  Film,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle
} from "lucide-react";

export interface MediaData {
  id: string;
  type: "video" | "audio";
  title: string;
  src: string;
  thumbnail?: string;
  duration?: string;
  isLive?: boolean;
  author?: string;
  views?: number;
}

export interface MediaPlayerCardProps {
  media: MediaData;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const MediaPlayerCard: React.FC<MediaPlayerCardProps> = ({
  media,
  className,
  autoPlay = false,
  showControls = true,
  onPlay,
  onPause,
  onEnded
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        mediaRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (mediaRef.current) {
      mediaRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  const dropdownItems = [
    { icon: <SkipBack className="h-4 w-4" />, label: "Skip Back", action: () => {} },
    { icon: <SkipForward className="h-4 w-4" />, label: "Skip Forward", action: () => {} },
    { icon: <Repeat className="h-4 w-4" />, label: "Repeat", action: () => {} },
    { icon: <Shuffle className="h-4 w-4" />, label: "Shuffle", action: () => {} },
  ];

  return (
    <GlobalCard className={cn("overflow-hidden", className)} title={""} description={""}>
      <div className="relative group">
        {/* Media Container */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {media.type === "video" ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={media.src}
              poster={media.thumbnail}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              autoPlay={autoPlay}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <audio
                ref={mediaRef as React.RefObject<HTMLAudioElement>}
                src={media.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                autoPlay={autoPlay}
                className="hidden"
              />
              <div className="text-center">
                <Radio className="h-16 w-16 text-white/60 mb-4" />
                <p className="text-white font-medium">{media.title}</p>
              </div>
            </div>
          )}

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
              <div className="flex items-center gap-2">
                {media.isLive && (
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                )}
                {media.duration && !media.isLive && (
                  <Badge variant="secondary" className="bg-black/60 text-white">
                    {media.duration}
                  </Badge>
                )}
              </div>
              
              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
                
                {showDropdown && (
                  <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[150px] z-50">
                    {dropdownItems.map((item, index) => (
                      <button
                        key={index}
                        className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                        onClick={item.action}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center Play Button */}
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 transition-all duration-200 hover:scale-110"
              onClick={handlePlay}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-black" />
              ) : (
                <Play className="h-8 w-8 text-black ml-1" />
              )}
            </button>

            {/* Bottom Controls */}
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs min-w-[40px]">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
                      }}
                    />
                    <span className="text-white text-xs min-w-[40px]">
                      {formatTime(duration)}
                    </span>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-white hover:text-gray-300 transition-colors"
                        onClick={() => handleVolumeChange(isMuted ? volume : 0)}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)`
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <SkipBack className="h-4 w-4" />
                      </button>
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <SkipForward className="h-4 w-4" />
                      </button>
                      <button className="text-white hover:text-gray-300 transition-colors">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Media Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {media.type === "video" ? (
                <Film className="h-4 w-4 text-gray-500" />
              ) : (
                <Radio className="h-4 w-4 text-gray-500" />
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {media.title}
              </h3>
            </div>
            {media.views && (
              <span className="text-sm text-gray-500">
                {media.views.toLocaleString()} views
              </span>
            )}
          </div>
          {media.author && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {media.author}
            </p>
          )}
        </div>
      </div>
    </GlobalCard>
  );
};

export default MediaPlayerCard;
