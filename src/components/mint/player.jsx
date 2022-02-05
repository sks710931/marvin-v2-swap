import React from "react";
import ReactPlayer from "react-player/lazy";

export const VideoPlayer = () => {
  return (
    <div className="player-cont">
      <ReactPlayer
        muted={true}
        loop
        playing={true}
        width="100%"
        height="100%"
        url="https://elonsmarvin.com/main.mp4"
      />
    </div>
  );
};
