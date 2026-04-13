import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {LESSON_PAIRS, THEMES, type ThemeId} from './data';

const introDuration = 6 * 30;
const pairDuration = 42 * 30;
const outroDuration = 42 * 30;

const drift = (frame: number, seed: number, speed: number, amp: number) =>
  Math.sin((frame + seed * 101) / speed) * amp;

const Background: React.FC<{theme: ThemeId}> = ({theme}) => {
  const palette = THEMES[theme];
  const frame = useCurrentFrame();

  const accents =
    theme === 'paper'
      ? [
          {top: '12%', left: '9%', size: 60, shape: 'circle'},
          {top: '26%', right: '12%', size: 46, shape: 'square'},
          {bottom: '20%', left: '14%', size: 52, shape: 'triangle'},
          {bottom: '15%', right: '18%', size: 38, shape: 'hex'},
        ]
      : [
          {top: '14%', left: '11%', size: 58, shape: 'circle'},
          {top: '28%', right: '11%', size: 44, shape: 'diamond'},
          {bottom: '22%', left: '16%', size: 50, shape: 'hex'},
          {bottom: '16%', right: '15%', size: 36, shape: 'triangle'},
        ];

  return (
    <AbsoluteFill style={{background: palette.bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 20% 20%, ${palette.accentSoft}, transparent 32%), radial-gradient(circle at 80% 75%, ${palette.accentSoft}, transparent 30%)`}} />
      {accents.map((accent, index) => {
        const x = drift(frame, index + 1, 90 + index * 16, 14);
        const y = drift(frame, index + 11, 110 + index * 10, 18);
        const rotate = drift(frame, index + 21, 150 + index * 22, 8);
        const common: React.CSSProperties = {
          position: 'absolute',
          width: accent.size,
          height: accent.size,
          opacity: 0.2,
          transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        };

        let clipPath: string | undefined;
        let borderRadius = 0;
        if (accent.shape === 'circle') borderRadius = 999;
        if (accent.shape === 'triangle') clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        if (accent.shape === 'hex') clipPath = 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)';
        if (accent.shape === 'diamond') clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';

        return (
          <div
            key={index}
            style={{
              ...common,
              top: accent.top,
              bottom: accent.bottom,
              left: accent.left,
              right: accent.right,
              borderRadius,
              clipPath,
              background: palette.accent,
            }}
          />
        );
      })}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: palette.accent, opacity: 0.9}} />
    </AbsoluteFill>
  );
};

const Card: React.FC<{
  theme: ThemeId;
  label: string;
  text: string;
  accent: string;
}> = ({theme, label, text, accent}) => {
  const palette = THEMES[theme];
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 28,
        padding: '28px 32px',
        background: palette.panel,
        border: `1.5px solid ${palette.border}`,
        boxShadow: theme === 'paper' ? '0 16px 48px rgba(0,0,0,0.08)' : '0 18px 56px rgba(0,0,0,0.22)',
      }}
    >
      <div style={{fontSize: 12, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', color: accent, marginBottom: 12}}>
        {label}
      </div>
      <div style={{fontSize: 34, lineHeight: 1.24, fontWeight: 800, color: palette.text}}>{text}</div>
    </div>
  );
};

const Intro: React.FC<{theme: ThemeId}> = ({theme}) => {
  const palette = THEMES[theme];
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 110}});

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 112px'}}>
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`}}>
        <div style={{display: 'inline-flex', borderRadius: 999, padding: '8px 16px', background: palette.accentSoft, color: palette.subtext, fontSize: 13, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20}}>
          5-minute lesson
        </div>
        <div style={{maxWidth: 920, fontSize: 78, lineHeight: 0.96, fontWeight: 900, letterSpacing: -2, color: palette.text}}>
          English you can learn in one focused sitting.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PairBeat: React.FC<{theme: ThemeId; index: number}> = ({theme, index}) => {
  const palette = THEMES[theme];
  const pair = LESSON_PAIRS[index % LESSON_PAIRS.length];
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = frame;
  const rise = spring({frame: localFrame, fps, config: {damping: 20, stiffness: 120}});

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 82px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, opacity: rise, transform: `translateY(${interpolate(rise, [0, 1], [24, 0])}px)`}}>
        <div style={{fontSize: 13, fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', color: palette.subtext}}>
          Example {index + 1}
        </div>
        <div style={{display: 'flex', gap: 24, alignItems: 'stretch'}}>
          <Card theme={theme} label="Word" text={pair.prompt} accent={palette.accent} />
          <div style={{width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.accent, fontSize: 28, fontWeight: 900}}>→</div>
          <Card theme={theme} label="Rule" text={pair.answer} accent={palette.accent} />
        </div>
        <div style={{maxWidth: 1200, borderRadius: 22, padding: '20px 24px', background: palette.panel, border: `1px solid ${palette.border}`, color: palette.subtext, fontSize: 24, lineHeight: 1.35, fontWeight: 700}}>
          {pair.note}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{theme: ThemeId}> = ({theme}) => {
  const palette = THEMES[theme];
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 110}});

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 112px'}}>
      <div style={{display: 'flex', gap: 32, alignItems: 'center', opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [22, 0])}px)`}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 18}}>
          <div style={{fontSize: 62, lineHeight: 0.98, fontWeight: 900, color: palette.text}}>
            Rendered in GitHub Actions. Ready to download.
          </div>
          <div style={{fontSize: 28, lineHeight: 1.24, fontWeight: 700, color: palette.subtext}}>
            This public render lane is intentionally minimal so 5-minute long-form exports can run cleanly as artifacts.
          </div>
          <div style={{display: 'inline-flex', alignSelf: 'flex-start', borderRadius: 999, padding: '16px 24px', background: palette.panel, border: `1.5px solid ${palette.border}`, color: palette.text, fontSize: 24, fontWeight: 800}}>
            Download the MP4 artifact
          </div>
        </div>
        <div style={{width: 520, borderRadius: 28, background: palette.panel, border: `1.5px solid ${palette.border}`, padding: 22, boxShadow: theme === 'paper' ? '0 16px 48px rgba(0,0,0,0.08)' : '0 18px 56px rgba(0,0,0,0.22)'}}>
          <div style={{aspectRatio: '16 / 10', borderRadius: 22, background: theme === 'paper' ? 'linear-gradient(135deg, #201814 0%, #4b2c21 100%)' : 'linear-gradient(135deg, #0f172a 0%, #111827 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontSize: 34, lineHeight: 1.2, color: '#ffffff', maxWidth: 360, textAlign: 'center', fontWeight: 800}}>
              Public render lane
              <br />
              5-minute long-form export
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LongFormFiveMinute: React.FC<{theme: ThemeId}> = ({theme}) => {
  const pairCount = Math.floor((300 * 30 - introDuration - outroDuration) / pairDuration);

  return (
    <AbsoluteFill style={{fontFamily: 'Inter, Segoe UI, sans-serif'}}>
      <Background theme={theme} />
      <Sequence from={0} durationInFrames={introDuration}>
        <Intro theme={theme} />
      </Sequence>
      {Array.from({length: pairCount}).map((_, index) => (
        <Sequence key={index} from={introDuration + index * pairDuration} durationInFrames={pairDuration}>
          <PairBeat theme={theme} index={index} />
        </Sequence>
      ))}
      <Sequence from={300 * 30 - outroDuration} durationInFrames={outroDuration}>
        <Outro theme={theme} />
      </Sequence>
    </AbsoluteFill>
  );
};
