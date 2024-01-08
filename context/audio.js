"use client";
import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [activeAudioPlayer, setActiveAudioPlayer] = useState(null);

  const playAudio = (audioPlayer) => {
    setActiveAudioPlayer(audioPlayer);
    audioPlayer.play();
  };

  const pauseAudio = () => {
    if (activeAudioPlayer) {
      activeAudioPlayer.pause();
      setActiveAudioPlayer(null);
    }
  };

  return (
    <AudioContext.Provider value={{ playAudio, pauseAudio, activeAudioPlayer }}>
      {children}
    </AudioContext.Provider>
  );
};
