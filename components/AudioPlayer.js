import React, { useState } from "react";
import { MdPlayCircle, MdStopCircle } from "react-icons/md";

const AudioPlayer = ({ audioUrl }) => {
  const [audio] = useState(new Audio(audioUrl));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center text-blue-400 absolute bg-zinc-200 rounded-full top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
      <button onClick={toggleAudio}>
        {isPlaying ? <MdStopCircle size={70} /> : <MdPlayCircle size={70} />}
      </button>
    </div>
  );
};

export default AudioPlayer;
