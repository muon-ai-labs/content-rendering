import React from 'react';
import {Composition} from 'remotion';
import {LongFormFiveMinute} from './LongFormFiveMinute';
import {VIDEO_DURATION_IN_FRAMES, VIDEO_FPS} from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LongForm5Min-Paper"
        component={LongFormFiveMinute}
        durationInFrames={VIDEO_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{theme: 'paper'}}
      />
      <Composition
        id="LongForm5Min-Midnight"
        component={LongFormFiveMinute}
        durationInFrames={VIDEO_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={1920}
        height={1080}
        defaultProps={{theme: 'midnight'}}
      />
    </>
  );
};
