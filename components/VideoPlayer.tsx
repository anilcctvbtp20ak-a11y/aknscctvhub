'use client';

import React, { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-navy border border-gray-800">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/video/cctvVideo.mp4"
      />

      {/* Control Overlay */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-3 bg-navy/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-white shadow-xl">
        <button
          type="button"
          onClick={toggleMute}
          className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          <span className="material-symbols-outlined text-xl">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <span className="material-symbols-outlined text-xl">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        <div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">
            {isMuted ? 'Autoplay Muted' : 'Sound On'}
          </p>
          <h4 className="font-bold text-xs md:text-sm leading-tight">
            {isMuted ? 'Click to Unmute Walkthrough' : 'Enjoy Live Setup Walkthrough'}
          </h4>
        </div>
      </div>
    </div>
  );
}
