import React from 'react';
import {Composition} from 'remotion';
import {PresentationTemplateV2} from './presentations-v2/PresentationTemplateV2';
import type {BeatMap} from './video-spec/types';

type PresentationProps = {
  beatMap?: BeatMap;
  beatMapPath?: string;
  durationInFrames?: number;
  variant?: 'default' | 'editorial';
};

const sumBeatMapDuration = (beatMap?: BeatMap) => {
  if (!beatMap) {
    return 9000;
  }

  const audioEnd = beatMap.audioSegments.reduce(
    (max, segment) => Math.max(max, segment.startMs + segment.durationMs),
    0,
  );
  const beatEnd = beatMap.beats.reduce((max, beat) => Math.max(max, beat.endMs), 0);
  return Math.max(1, Math.round((Math.max(audioEnd, beatEnd, 1000) / 1000) * 30));
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ActualPaperDepth5Min"
        component={PresentationTemplateV2}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={8840}
        defaultProps={{
          beatMapPath: 'generated/custom-5min/actual-paper-depth-5min.beat-map.json',
          durationInFrames: 8840,
          variant: 'default',
        }}
        calculateMetadata={({props}) => ({
          durationInFrames:
            (props as PresentationProps).durationInFrames ??
            sumBeatMapDuration((props as PresentationProps).beatMap),
        })}
      />
      <Composition
        id="ActualEditorialV55Min"
        component={PresentationTemplateV2}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={8996}
        defaultProps={{
          beatMapPath: 'generated/custom-5min/actual-editorial-v5-5min.beat-map.json',
          durationInFrames: 8996,
          variant: 'editorial',
        }}
        calculateMetadata={({props}) => ({
          durationInFrames:
            (props as PresentationProps).durationInFrames ??
            sumBeatMapDuration((props as PresentationProps).beatMap),
        })}
      />
    </>
  );
};
