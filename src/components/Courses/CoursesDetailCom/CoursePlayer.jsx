import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  Flame,
  Volume2,
  VolumeX,
  CheckCircle2,
} from "lucide-react";

export default function CoursePlayer({
  course,
  currentLesson,
  progress = 0,
  completedLessons = 0,
  totalLessons = 0,
  goToNextLesson,
  onMarkComplete,
}) {
  const videoRef = useRef(null);

  const hasVideo = !!course?.vid;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const displayedProgress = hasVideo
    ? Math.round(videoProgress)
    : Math.min(100, Math.max(0, progress || 0));

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * displayedProgress) / 100;

  useEffect(() => {
    setIsPlaying(false);
    setVideoProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setIsCompleted(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [course?.id]);

  const toggleVideo = async () => {
    if (!hasVideo || !videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.log("Video error:", err);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const changePlaybackRate = () => {
    if (!videoRef.current) return;

    const rates = [1, 1.25, 1.5, 2];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];

    videoRef.current.playbackRate = next;
    setPlaybackRate(next);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setCurrentTime(current);

    if (total > 0) {
      setVideoProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;

    const percent = Number(e.target.value);
    videoRef.current.currentTime = (percent / 100) * duration;
    setVideoProgress(percent);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    setVideoProgress(100);
  };

  const formatTime = (t) => {
    if (!Number.isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative">
        {/* VIDEO / IMAGE */}
        {hasVideo ? (
          <video
            ref={videoRef}
            src={course.vid}
            poster={course.image}
            className="h-[220px] w-full object-cover md:h-[420px]"
            onClick={toggleVideo}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
        ) : (
          <img
            src={course.image}
            alt={course.title}
            className="h-[220px] w-full object-cover md:h-[420px]"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute left-4 top-4 z-20">
          <div className="relative h-16 w-16 md:h-24 md:w-24">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-500"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-sm font-bold md:text-xl">
                {displayedProgress}%
              </span>
              <span className="text-[10px]">Done</span>
            </div>
          </div>
        </div>

        {/* PLAY BUTTON */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={toggleVideo}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
          </div>
        )}

        {/* CONTROLS */}
        {hasVideo && (
          <div className="absolute bottom-0 w-full p-4 text-white">
            <input
              type="range"
              min="0"
              max="100"
              value={videoProgress}
              onChange={handleSeek}
              className="w-full accent-purple-600"
            />

            <div className="flex justify-between mt-2">
              <div className="flex gap-3 items-center">
                <button onClick={toggleVideo}>
                  {isPlaying ? <Pause /> : <Play />}
                </button>

                <button onClick={changePlaybackRate}>{playbackRate}x</button>

                <span>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button onClick={toggleMute}>
                {isMuted ? <VolumeX /> : <Volume2 />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold">{course.title}</h2>

        <p className="text-sm text-gray-500">
          {displayedProgress}% • {completedLessons}/{totalLessons}
        </p>

        <div className="h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-purple-600 rounded-full"
            style={{ width: `${displayedProgress}%` }}
          />
        </div>

        <div className="flex justify-end items-center gap-2 text-orange-500">
          <Flame /> 7 Day Streak
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              setIsCompleted(true);
              onMarkComplete?.();
            }}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-purple-600"
          >
            <CheckCircle2 /> {isCompleted ? "Completed" : "Complete"}
          </button>

          <button
            onClick={goToNextLesson}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
