import React from "react";
import ReactPlayer from "react-player/lazy";

export const VideoPlayer = () => {
  return (
    <div>
      <ReactPlayer
        muted={true}
        loop
        playing={true}
        url="https://firebasestorage.googleapis.com/v0/b/marvin-liquidity-swap.appspot.com/o/marvin-Banner-video.mp4?alt=media&token=e7159d63-8607-45f4-9d68-965c554f95a1"
      />
    </div>
  );
};
