import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {hindSiliguri} from '../../fonts';
import {resolveStylePreset, motionPresets, typographyPresets} from '../../video-spec/presets';
import type {Beat, MotionPreset} from '../../video-spec/types';

type BeatRendererProps = {
  beat: Beat;
  stylePresetId: string;
  ctaKindOverride?: 'web' | 'app';
};

const useBeatMotion = (motion: MotionPreset, durationFrames = 1) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 120}});
  const exitStart = Math.max(0, durationFrames - Math.max(1, Math.round((motion.exitDurationMs / 1000) * fps)));
  const exitProgress = interpolate(frame, [exitStart, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(enter, [0, 1], [0, 1], {extrapolateRight: 'clamp'}) * interpolate(exitProgress, [0, 1], [1, 0]);

  let translateY = 0;
  let scale = 1;
  if (motion.enter === 'fade-rise') {
    translateY = interpolate(enter, [0, 1], [24, 0]);
  } else if (motion.enter === 'scale-pop') {
    scale = interpolate(enter, [0, 1], [0.92, 1]);
    translateY = interpolate(enter, [0, 1], [18, 0]);
  } else if (motion.enter === 'drift') {
    translateY = interpolate(enter, [0, 1], [32, 0]);
  } else {
    scale = interpolate(enter, [0, 1], [1.05, 1]);
    translateY = interpolate(enter, [0, 1], [40, 0]);
  }

  return {
    opacity,
    transform: `translateY(${translateY}px) scale(${scale})`,
  };
};

const CueText: React.FC<{
  visibleFromMs: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({visibleFromMs, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cueFrame = Math.max(0, Math.round((visibleFromMs / 1000) * fps));
  const t = spring({frame: frame - cueFrame, fps, config: {damping: 18, stiffness: 130}});
  return (
    <div
      style={{
        opacity: interpolate(t, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(t, [0, 1], [14, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const TopicIntroBeat: React.FC<BeatRendererProps> = ({beat, stylePresetId}) => {
  const stylePreset = resolveStylePreset(stylePresetId);
  const type = typographyPresets[stylePreset.typographyPresetId];
  const {fps} = useVideoConfig();
  const durationFrames = Math.max(1, Math.round(((beat.endMs - beat.startMs) / 1000) * fps));
  const motion = motionPresets[beat.motionPresetId ?? stylePreset.motionDefaults.topic_intro];
  const motionStyle = useBeatMotion(motion, durationFrames);

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 110px'}}>
      <div style={{maxWidth: 920, ...motionStyle}}>
        <div
          style={{
            display: 'inline-flex',
            padding: '8px 16px',
            borderRadius: 999,
            background: stylePreset.colorTokens.accentSoft,
            border: `1px solid ${stylePreset.colorTokens.panelBorder}`,
            color: stylePreset.colorTokens.subtext,
            fontFamily: type.labelFont,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          {String(beat.payload.kicker ?? 'Grammar Topic')}
        </div>
        <div
          style={{
            fontFamily: type.titleFont,
            fontSize: 76,
            lineHeight: 0.95,
            fontWeight: 900,
            color: stylePreset.colorTokens.text,
            letterSpacing: -1.8,
          }}
        >
          {String(beat.payload.title ?? '')}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ExamplePairBeat: React.FC<BeatRendererProps> = ({beat, stylePresetId}) => {
  const stylePreset = resolveStylePreset(stylePresetId);
  const type = typographyPresets[stylePreset.typographyPresetId];
  const {fps} = useVideoConfig();
  const durationFrames = Math.max(1, Math.round(((beat.endMs - beat.startMs) / 1000) * fps));
  const motion = motionPresets[beat.motionPresetId ?? stylePreset.motionDefaults.example_pair];
  const motionStyle = useBeatMotion(motion, durationFrames);

  const mode = String(beat.payload.mode ?? 'wrong_to_right');
  const isBnToEn = mode === 'bn_to_en';
  const leftLabel = isBnToEn ? 'Bangla' : 'Wrong';
  const leftColor = isBnToEn ? stylePreset.colorTokens.accent : stylePreset.colorTokens.wrong;
  const leftText = isBnToEn ? String(beat.payload.bnText ?? '') : String(beat.payload.wrongText ?? '');
  const leftAtMs = isBnToEn ? Number(beat.payload.bnAtMs ?? 0) : Number(beat.payload.wrongAtMs ?? 0);
  const leftFontFamily = isBnToEn ? hindSiliguri : type.bodyFont;
  const leftTextDecoration = isBnToEn ? 'none' : 'line-through';

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 86px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, ...motionStyle}}>
        <div
          style={{
            fontFamily: type.labelFont,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: stylePreset.colorTokens.subtext,
          }}
        >
          {String(beat.payload.label ?? '')}
        </div>
        <div style={{display: 'flex', gap: 26, alignItems: 'stretch'}}>
          <CueText
            visibleFromMs={leftAtMs}
            style={{
              flex: 1,
              borderRadius: 26,
              padding: '30px 34px',
              background: stylePreset.colorTokens.panel,
              border: `1.5px solid ${stylePreset.colorTokens.panelBorder}`,
              boxShadow: '0 16px 50px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{fontFamily: type.labelFont, fontSize: 11, fontWeight: 900, letterSpacing: 3, color: `${leftColor}aa`, marginBottom: 12}}>{leftLabel}</div>
            <div style={{fontFamily: leftFontFamily, fontSize: isBnToEn ? 26 : 28, fontWeight: 800, lineHeight: 1.3, color: leftColor, textDecoration: leftTextDecoration, textDecorationColor: `${leftColor}66`}}>
              {leftText}
            </div>
          </CueText>
          <CueText
            visibleFromMs={Number(beat.payload.rightAtMs ?? 0)}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, flexShrink: 0}}
          >
            <div style={{width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: stylePreset.colorTokens.accentSoft, border: `1px solid ${stylePreset.colorTokens.panelBorder}`, color: stylePreset.colorTokens.accent, fontWeight: 900}}>
              →
            </div>
          </CueText>
          <CueText
            visibleFromMs={Number(beat.payload.rightAtMs ?? 0)}
            style={{
              flex: 1,
              borderRadius: 26,
              padding: '30px 34px',
              background: stylePreset.colorTokens.panel,
              border: `1.5px solid ${stylePreset.colorTokens.panelBorder}`,
              boxShadow: '0 16px 50px rgba(0,0,0,0.12)',
            }}
          >
            <div style={{fontFamily: type.labelFont, fontSize: 11, fontWeight: 900, letterSpacing: 3, color: `${stylePreset.colorTokens.right}aa`, marginBottom: 12}}>{isBnToEn ? 'English' : 'Right'}</div>
            <div style={{fontFamily: type.bodyFont, fontSize: 28, fontWeight: 800, lineHeight: 1.3, color: stylePreset.colorTokens.right}}>
              {String(beat.payload.rightText ?? '')}
            </div>
          </CueText>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const RuleCalloutBeat: React.FC<BeatRendererProps> = ({beat, stylePresetId}) => {
  const stylePreset = resolveStylePreset(stylePresetId);
  const type = typographyPresets[stylePreset.typographyPresetId];
  const {fps} = useVideoConfig();
  const durationFrames = Math.max(1, Math.round(((beat.endMs - beat.startMs) / 1000) * fps));
  const motion = motionPresets[beat.motionPresetId ?? stylePreset.motionDefaults.rule_callout];
  const motionStyle = useBeatMotion(motion, durationFrames);

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 110px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 26, ...motionStyle}}>
        <div style={{maxWidth: 820}}>
          <CueText visibleFromMs={Number(beat.payload.titleAtMs ?? 0)}>
            <div
              style={{
                display: 'inline-flex',
                padding: '10px 18px',
                borderRadius: 999,
                background: stylePreset.colorTokens.accentSoft,
                border: `1px solid ${stylePreset.colorTokens.panelBorder}`,
                color: stylePreset.colorTokens.accent,
                fontFamily: type.labelFont,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 26,
              }}
            >
              Grammar Rule
            </div>
            <div
              style={{
                fontFamily: type.titleFont,
                fontSize: 58,
                lineHeight: 1.02,
                fontWeight: 900,
                color: stylePreset.colorTokens.text,
                marginBottom: 20,
              }}
            >
              {String(beat.payload.title ?? '')}
            </div>
          </CueText>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <CueText visibleFromMs={Number(beat.payload.summaryAtMs ?? 0)}>
              <div
                style={{
                  borderRadius: 24,
                  padding: '24px 30px',
                  background: stylePreset.colorTokens.panel,
                  border: `1px solid ${stylePreset.colorTokens.panelBorder}`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  fontFamily: hindSiliguri,
                  fontSize: 26,
                  lineHeight: 1.45,
                  fontWeight: 700,
                  color: stylePreset.colorTokens.text,
                }}
              >
                {String(beat.payload.summary ?? '')}
              </div>
            </CueText>
            <CueText visibleFromMs={Number(beat.payload.memoryAtMs ?? 0)}>
              <div
                style={{
                  padding: '10px 30px',
                  fontFamily: type.bodyFont,
                  fontSize: 20,
                  fontWeight: 700,
                  color: stylePreset.colorTokens.subtext,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{width: 8, height: 8, borderRadius: 999, background: stylePreset.colorTokens.accent}} />
                {String(beat.payload.memory ?? '')}
              </div>
            </CueText>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const RecapBeat: React.FC<BeatRendererProps> = ({beat, stylePresetId, ctaKindOverride}) => {
  const stylePreset = resolveStylePreset(stylePresetId);
  const type = typographyPresets[stylePreset.typographyPresetId];
  const {fps} = useVideoConfig();
  const durationFrames = Math.max(1, Math.round(((beat.endMs - beat.startMs) / 1000) * fps));
  const motion = motionPresets[beat.motionPresetId ?? stylePreset.motionDefaults.recap];
  const motionStyle = useBeatMotion(motion, durationFrames);

  const recapMode = String(beat.payload.recapMode ?? 'default');
  if (recapMode === 'cta') {
    const ctaKind = ctaKindOverride ?? (String(beat.payload.ctaKind ?? 'web') as 'web' | 'app');
    const actionLabel =
      ctaKind === 'app'
        ? 'Google Play Store থেকে "Muon AI" অ্যাপটি ডাউনলোড করুন'
        : 'ভিজিট করুন muonaiapp.com';
    const ctaTitle = 'Free English Lessons Every Day';
    const eyebrow = ctaKind === 'app' ? 'ANDROID APP' : 'WEBSITE';
    const homepagePreview = null;
    const homepageScreenshot = ctaKind === 'app' 
      ? staticFile('assets/muon_android_cta.jpg') 
      : staticFile('assets/muon_home_top_bn.png');
    const banglaTitle = 'প্রতিদিন ফ্রি ইংরেজি শিখুন';

    return (
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 82px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: ctaKind === 'app' ? 280 : 34, ...motionStyle}}>
          <div style={{width: 540, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20}}>
            <div
              style={{
                fontFamily: type.titleFont,
                fontSize: 56,
                lineHeight: 1.02,
                fontWeight: 900,
                color: stylePreset.colorTokens.text,
                textWrap: 'balance',
              }}
            >
              {ctaTitle}
            </div>
            <div
              style={{
                fontFamily: hindSiliguri,
                fontSize: 28,
                lineHeight: 1.24,
                fontWeight: 700,
                color: stylePreset.colorTokens.text,
              }}
            >
              {banglaTitle}
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: 12,
                marginTop: 4,
                borderRadius: 999,
                padding: '16px 24px',
                background: stylePreset.colorTokens.panel,
                border: `1.5px solid ${stylePreset.colorTokens.panelBorder}`,
                boxShadow: '0 16px 50px rgba(0,0,0,0.10)',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: stylePreset.colorTokens.accent,
                }}
              />
              <div
                style={{
                  fontFamily: hindSiliguri,
                  fontSize: 22,
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: stylePreset.colorTokens.text,
                }}
              >
                {actionLabel}
              </div>
            </div>
          </div>
          <div
            style={{
              width: ctaKind === 'app' ? 380 : 940,
              flexShrink: 0,
              borderRadius: 32,
              padding: 16,
              background: stylePreset.colorTokens.panel,
              border: `1.5px solid ${stylePreset.colorTokens.panelBorder}`,
              boxShadow: '0 24px 70px rgba(0,0,0,0.16)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 8px 12px',
                position: 'relative',
              }}
            >
              <div style={{display: 'flex', gap: 8, position: 'absolute', left: 16}}>
                <div style={{width: 10, height: 10, borderRadius: 999, background: '#f87171'}} />
                <div style={{width: 10, height: 10, borderRadius: 999, background: '#fbbf24'}} />
                <div style={{width: 10, height: 10, borderRadius: 999, background: '#34d399'}} />
              </div>
              {ctaKind === 'web' && (
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: type.bodyFont,
                    color: stylePreset.colorTokens.subtext,
                    opacity: 0.6,
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                  }}
                >
                  muonaiapp.com
                </div>
              )}
            </div>
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 22,
                border: `1px solid ${stylePreset.colorTokens.panelBorder}`,
                background: '#0f1117',
                aspectRatio: ctaKind === 'app' ? '9 / 19.5' : '16 / 9',
              }}
            >
              <Img
                src={homepageScreenshot}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: ctaKind === 'app' ? 'contain' : 'cover',
                }}
              />
              {homepagePreview && (
                <OffthreadVideo
                  src={homepagePreview}
                  muted
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: ctaKind === 'app' ? 'contain' : 'cover',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 130px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 24, ...motionStyle}}>
        <div style={{fontFamily: type.titleFont, fontSize: 58, lineHeight: 1.02, fontWeight: 900, color: stylePreset.colorTokens.text}}>
          {String(beat.payload.title ?? '')}
        </div>
        <div
          style={{
            borderRadius: 24,
            padding: '24px 28px',
            background: stylePreset.colorTokens.panel,
            border: `1px solid ${stylePreset.colorTokens.panelBorder}`,
            fontFamily: hindSiliguri,
            fontSize: 24,
            lineHeight: 1.4,
            fontWeight: 700,
            color: stylePreset.colorTokens.subtext,
          }}
        >
          {String(beat.payload.memory ?? '')}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BeatRenderer: React.FC<BeatRendererProps> = ({beat, stylePresetId}) => {
  switch (beat.kind) {
    case 'topic_intro':
      return <TopicIntroBeat beat={beat} stylePresetId={stylePresetId} />;
    case 'example_pair':
      return <ExamplePairBeat beat={beat} stylePresetId={stylePresetId} />;
    case 'rule_callout':
      return <RuleCalloutBeat beat={beat} stylePresetId={stylePresetId} />;
    case 'recap':
      return <RecapBeat beat={beat} stylePresetId={stylePresetId} />;
    default:
      return null;
  }
};
