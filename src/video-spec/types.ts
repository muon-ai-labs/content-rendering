export type ScriptLineKind =
  | 'topic_intro'
  | 'hook_wrong'
  | 'hook_bn'
  | 'hook_right'
  | 'rule'
  | 'example_wrong'
  | 'example_bn'
  | 'example_right'
  | 'recap';

export type ScriptLine = {
  id: string;
  kind: ScriptLineKind;
  text: string;
  language: 'en' | 'bn';
  groupId?: string;
};

export type ScriptSpec = {
  lessonId: string;
  title: string;
  stylePresetId: string;
  lines: ScriptLine[];
};

export type AudioSegment = {
  id: string;
  lineId: string;
  src: string;
  durationMs: number;
  startMs: number;
  transcript?: string;
};

export type AudioManifest = {
  lessonId: string;
  segments: AudioSegment[];
};

export type BeatKind =
  | 'topic_intro'
  | 'example_pair'
  | 'rule_callout'
  | 'recap';

export type Beat = {
  id: string;
  kind: BeatKind;
  startMs: number;
  endMs: number;
  payload: Record<string, unknown>;
  motionPresetId?: string;
  layoutVariantId?: string;
};

export type BeatMap = {
  lessonId: string;
  aspect: 'landscape' | 'portrait';
  stylePresetId: string;
  audioSegments: AudioSegment[];
  beats: Beat[];
  overrides?: {
    timing?: Record<string, {startMs?: number; endMs?: number}>;
  };
};

export type MotionPreset = {
  id: string;
  enter: 'fade-rise' | 'scale-pop' | 'drift' | 'cinematic';
  enterDurationMs: number;
  exitDurationMs: number;
};

export type TypographyPreset = {
  id: string;
  titleFont: string;
  bodyFont: string;
  labelFont: string;
};

export type StylePreset = {
  id: string;
  backgroundPresetId: string;
  motionDefaults: Record<BeatKind, string>;
  transitionPresetId: string;
  typographyPresetId: string;
  surfacePresetId: string;
  colorTokens: {
    accent: string;
    accentSoft: string;
    wrong: string;
    right: string;
    text: string;
    subtext: string;
    panel: string;
    panelBorder: string;
    bg: string;
  };
};
