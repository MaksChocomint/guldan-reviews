import { setViews } from "@/actions/setActions";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { MdPlayCircle, MdStopCircle } from "react-icons/md";

const AudioPlayer = ({ audioUrl, reviewId }) => {
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const pathname = usePathname();

  const [isViewed, setIsViewed] = useState(false);

  const toggleAudio = async (e) => {
    e.stopPropagation();

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
    if (!isViewed) {
      await setViews(reviewId);
      setIsViewed(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audio.duration);
  };

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleAudioEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleAudioEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audio]);

  const handleSeekBarChange = (e) => {
    e.stopPropagation();
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  return (
    <div
      className={`w-full ${
        pathname.startsWith("/reviews") ? "h-2/3" : "h-[70%]"
      } absolute top-2/3 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col items-center text-blue-400 w-[70px] bg-zinc-200 rounded-full ">
        <button onClick={toggleAudio}>
          {isPlaying ? <MdStopCircle size={70} /> : <MdPlayCircle size={70} />}
        </button>
      </div>
      <input
        type="range"
        value={currentTime}
        min={0}
        max={duration}
        step={1}
        onChange={handleSeekBarChange}
        onClick={(e) => e.stopPropagation()}
        className="w-full relative z-50 rounded-none"
      />
    </div>
  );
};

export default AudioPlayer;
