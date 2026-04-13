import type {BeatMap} from './types';
import {motionPresets, stylePresets} from './presets';

const minimumBeatDurationMs: Record<string, number> = {
  topic_intro: 1200,
  example_pair: 1800,
  rule_callout: 1600,
  recap: 1400,
};

export const validateBeatMap = (beatMap: BeatMap): string[] => {
  const errors: string[] = [];

  if (!stylePresets[beatMap.stylePresetId]) {
    errors.push(`Unknown style preset: ${beatMap.stylePresetId}`);
  }

  for (const beat of beatMap.beats) {
    if (beat.endMs <= beat.startMs) {
      errors.push(`Beat ${beat.id} has non-positive duration.`);
    }
    if ((beat.endMs - beat.startMs) < (minimumBeatDurationMs[beat.kind] ?? 1000)) {
      errors.push(`Beat ${beat.id} is shorter than the minimum duration for ${beat.kind}.`);
    }
    if (beat.motionPresetId && !motionPresets[beat.motionPresetId]) {
      errors.push(`Beat ${beat.id} references unknown motion preset ${beat.motionPresetId}.`);
    }
    if (beat.motionPresetId) {
      const motion = motionPresets[beat.motionPresetId];
      if (motion && (motion.enterDurationMs + motion.exitDurationMs) >= (beat.endMs - beat.startMs)) {
        errors.push(`Beat ${beat.id} is too short for motion preset ${beat.motionPresetId}.`);
      }
    }
  }

  for (let i = 1; i < beatMap.beats.length; i += 1) {
    const prev = beatMap.beats[i - 1];
    const current = beatMap.beats[i];
    if (current.startMs < prev.endMs) {
      errors.push(`Beat ${current.id} overlaps with ${prev.id}.`);
    }
  }

  let lastAudioEnd = 0;
  for (const segment of beatMap.audioSegments) {
    if (segment.durationMs <= 0) {
      errors.push(`Audio segment ${segment.id} has non-positive duration.`);
    }
    if (segment.startMs < lastAudioEnd) {
      errors.push(`Audio segment ${segment.id} overlaps with a previous segment.`);
    }
    lastAudioEnd = Math.max(lastAudioEnd, segment.startMs + segment.durationMs);
  }

  return errors;
};
