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
        url="https://firebasestorage.googleapis.com/v0/b/elons-marvin.appspot.com/o/main.mp4?alt=media&token=abd1c586-f7ac-456a-871b-dc5ad03c89e7"
      />
    </div>
  );
};
