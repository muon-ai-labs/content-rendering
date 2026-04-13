import {hindSiliguri, montserrat, serif, playfair, lora, inter, mono} from '../fonts';
import type {MotionPreset, StylePreset, TypographyPreset} from './types';

export const motionPresets: Record<string, MotionPreset> = {
  'soft-rise': {id: 'soft-rise', enter: 'fade-rise', enterDurationMs: 380, exitDurationMs: 220},
  'snappy-card': {id: 'snappy-card', enter: 'scale-pop', enterDurationMs: 260, exitDurationMs: 180},
  drift: {id: 'drift', enter: 'drift', enterDurationMs: 420, exitDurationMs: 240},
  cinematic: {id: 'cinematic', enter: 'cinematic', enterDurationMs: 520, exitDurationMs: 260},
};

export const typographyPresets: Record<string, TypographyPreset> = {
  editorial: {id: 'editorial', titleFont: serif, bodyFont: montserrat, labelFont: montserrat},
  modern: {id: 'modern', titleFont: montserrat, bodyFont: montserrat, labelFont: montserrat},
  human: {id: 'human', titleFont: serif, bodyFont: hindSiliguri, labelFont: montserrat},
  punchy: {id: 'punchy', titleFont: montserrat, bodyFont: montserrat, labelFont: montserrat},
  cinema: {id: 'cinema', titleFont: serif, bodyFont: montserrat, labelFont: montserrat},
  // V5 Typography - Highly Distinct
  'editorial-v5': {id: 'editorial-v5', titleFont: playfair, bodyFont: lora, labelFont: montserrat},
  'app-hybrid-v5': {id: 'app-hybrid-v5', titleFont: inter, bodyFont: inter, labelFont: inter},
  'structured-v5': {id: 'structured-v5', titleFont: inter, bodyFont: mono, labelFont: mono},
  // Keep V4 for Guided (as it was requested to be untouched)
  'guided-v4': {id: 'guided-v4', titleFont: inter, bodyFont: inter, labelFont: inter},
  // New AAA Variants
  'neo-minimal': {id: 'neo-minimal', titleFont: inter, bodyFont: inter, labelFont: inter},
  'productivity-canvas': {id: 'productivity-canvas', titleFont: inter, bodyFont: inter, labelFont: mono},
  'documentary-dark': {id: 'documentary-dark', titleFont: playfair, bodyFont: lora, labelFont: montserrat},
  'soft-tech-finance': {id: 'soft-tech-finance', titleFont: inter, bodyFont: inter, labelFont: inter},
  'gamified-learning': {id: 'gamified-learning', titleFont: montserrat, bodyFont: montserrat, labelFont: montserrat},
};

export const stylePresets: Record<string, StylePreset> = {
  'editorial-glow': {
    id: 'editorial-glow',
    backgroundPresetId: 'editorial-glow',
    motionDefaults: {
      topic_intro: 'soft-rise',
      example_pair: 'soft-rise',
      rule_callout: 'drift',
      recap: 'soft-rise',
    },
    transitionPresetId: 'soft-cut',
    typographyPresetId: 'editorial',
    surfacePresetId: 'glass-soft',
    colorTokens: {
      accent: '#e39a5d',
      accentSoft: 'rgba(227,154,93,0.18)',
      wrong: '#f5a3a3',
      right: '#8ef0b4',
      text: '#f6f3ef',
      subtext: 'rgba(246,243,239,0.68)',
      panel: 'rgba(16,21,31,0.60)',
      panelBorder: 'rgba(255,255,255,0.09)',
      bg: '#08131f',
    },
  },
  'glass-neon': {
    id: 'glass-neon',
    backgroundPresetId: 'glass-neon',
    motionDefaults: {
      topic_intro: 'snappy-card',
      example_pair: 'snappy-card',
      rule_callout: 'snappy-card',
      recap: 'soft-rise',
    },
    transitionPresetId: 'pulse-cut',
    typographyPresetId: 'modern',
    surfacePresetId: 'glass-strong',
    colorTokens: {
      accent: '#4de7cf',
      accentSoft: 'rgba(77,231,207,0.18)',
      wrong: '#ff8f8f',
      right: '#8dffa7',
      text: '#ecfffb',
      subtext: 'rgba(236,255,251,0.70)',
      panel: 'rgba(4,15,24,0.62)',
      panelBorder: 'rgba(77,231,207,0.16)',
      bg: '#031019',
    },
  },
  'paper-depth': {
    id: 'paper-depth',
    backgroundPresetId: 'paper-depth',
    motionDefaults: {
      topic_intro: 'drift',
      example_pair: 'soft-rise',
      rule_callout: 'drift',
      recap: 'soft-rise',
    },
    transitionPresetId: 'paper-fade',
    typographyPresetId: 'human',
    surfacePresetId: 'paper-panel',
    colorTokens: {
      accent: '#b7743f',
      accentSoft: 'rgba(183,116,63,0.18)',
      wrong: '#bb5b5b',
      right: '#488b57',
      text: '#1d2329',
      subtext: 'rgba(29,35,41,0.64)',
      panel: 'rgba(255,251,244,0.85)',
      panelBorder: 'rgba(122,97,71,0.18)',
      bg: '#f3ebdf',
    },
  },
  'kinetic-contrast': {
    id: 'kinetic-contrast',
    backgroundPresetId: 'kinetic-contrast',
    motionDefaults: {
      topic_intro: 'snappy-card',
      example_pair: 'snappy-card',
      rule_callout: 'snappy-card',
      recap: 'snappy-card',
    },
    transitionPresetId: 'hard-wipe',
    typographyPresetId: 'punchy',
    surfacePresetId: 'solid-bold',
    colorTokens: {
      accent: '#ff9b3d',
      accentSoft: 'rgba(255,155,61,0.20)',
      wrong: '#ff8f7d',
      right: '#b7ff7c',
      text: '#fdf7ef',
      subtext: 'rgba(253,247,239,0.70)',
      panel: 'rgba(10,15,28,0.72)',
      panelBorder: 'rgba(255,255,255,0.10)',
      bg: '#07101e',
    },
  },
  'cinematic-dark': {
    id: 'cinematic-dark',
    backgroundPresetId: 'cinematic-dark',
    motionDefaults: {
      topic_intro: 'cinematic',
      example_pair: 'soft-rise',
      rule_callout: 'cinematic',
      recap: 'cinematic',
    },
    transitionPresetId: 'light-sweep',
    typographyPresetId: 'cinema',
    surfacePresetId: 'glass-dark',
    colorTokens: {
      accent: '#d7a46d',
      accentSoft: 'rgba(215,164,109,0.16)',
      wrong: '#f0a1a1',
      right: '#9ae0ad',
      text: '#f5f0e8',
      subtext: 'rgba(245,240,232,0.66)',
      panel: 'rgba(9,12,18,0.68)',
      panelBorder: 'rgba(255,255,255,0.08)',
      bg: '#05070c',
    },
  },
  // V5: Editorial (The Newspaper / Print-First Style)
  'editorial-v5': {
    id: 'editorial-v5',
    backgroundPresetId: 'editorial-v5',
    motionDefaults: {
      topic_intro: 'cinematic',
      example_pair: 'soft-rise',
      rule_callout: 'drift',
      recap: 'cinematic',
    },
    transitionPresetId: 'paper-fade',
    typographyPresetId: 'editorial-v5',
    surfacePresetId: 'paper-panel',
    colorTokens: {
      accent: '#000000', // Pitch Black Ink
      accentSoft: 'rgba(0,0,0,0.06)',
      wrong: '#e11d48',
      right: '#166534',
      text: '#111827', // High-Contrast Gray-Black
      subtext: 'rgba(17,24,39,0.70)',
      panel: '#FFFFFF', // Pure White Paper
      panelBorder: '#D1D5DB', // Subtle Paper Edge
      bg: '#FFFFFF', // Stark White
    },
  },
  // V5: App-Hybrid (Product SaaS / Ultra-Polished Modern UI)
  'app-hybrid-v5': {
    id: 'app-hybrid-v5',
    backgroundPresetId: 'app-hybrid-v5',
    motionDefaults: {
      topic_intro: 'snappy-card',
      example_pair: 'snappy-card',
      rule_callout: 'snappy-card',
      recap: 'snappy-card',
    },
    transitionPresetId: 'pulse-cut',
    typographyPresetId: 'app-hybrid-v5',
    surfacePresetId: 'glass-strong',
    colorTokens: {
      accent: '#818CF8', // Brighter Indigo (Indigo 400)
      accentSoft: 'rgba(129,140,248,0.15)',
      wrong: '#FB7185', // Brighter Rose (Rose 400)
      right: '#4ADE80', // Brighter Green (Green 400)
      text: '#F8FAFC',
      subtext: 'rgba(248,250,252,0.92)', // Significant boost for readability
      panel: 'rgba(23,23,23,0.72)',
      panelBorder: 'rgba(255,255,255,0.12)',
      bg: '#0F1115',
    },
  },
  // V5: Structured-Flow (The Technical Schematic / Blueprint Manual)
  'structured-flow-v5': {
    id: 'structured-flow-v5',
    backgroundPresetId: 'structured-flow-v5',
    motionDefaults: {
      topic_intro: 'drift',
      example_pair: 'snappy-card',
      rule_callout: 'drift',
      recap: 'soft-rise',
    },
    transitionPresetId: 'hard-wipe',
    typographyPresetId: 'structured-v5',
    surfacePresetId: 'solid-bold',
    colorTokens: {
      accent: '#FACC15', // Blueprint Yellow
      accentSoft: 'rgba(250,204,21,0.20)',
      wrong: '#f87171',
      right: '#4ade80',
      text: '#F1F5F9',
      subtext: 'rgba(241,245,249,0.88)', // Boosted for dark blueprint bg
      panel: '#1e3a8a', // Corporate Blue Card
      panelBorder: '#FACC15', // High Contrast Border
      bg: '#172554', // Dark Blueprint Royal Blue
    },
  },
  // Unchanged Guided V4
  'guided-v4': {
    id: 'guided-v4',
    backgroundPresetId: 'guided-v4',
    motionDefaults: {
      topic_intro: 'soft-rise',
      example_pair: 'soft-rise',
      rule_callout: 'soft-rise',
      recap: 'soft-rise',
    },
    transitionPresetId: 'soft-cut',
    typographyPresetId: 'guided-v4',
    surfacePresetId: 'solid-bold',
    colorTokens: {
      accent: '#FF6B00',
      accentSoft: 'rgba(255,107,0,0.14)',
      wrong: '#d13434',
      right: '#16a34a',
      text: '#0F172A',
      subtext: 'rgba(15,23,42,0.65)',
      panel: '#FFFFFF',
      panelBorder: '#000000',
      bg: '#E2E8F0',
    },
  },
  // NEW: neo-minimal (The Apple minimalist)
  'neo-minimal': {
    id: 'neo-minimal',
    backgroundPresetId: 'neo-minimal',
    motionDefaults: {
      topic_intro: 'drift',
      example_pair: 'drift',
      rule_callout: 'drift',
      recap: 'drift',
    },
    transitionPresetId: 'soft-cut',
    typographyPresetId: 'neo-minimal',
    surfacePresetId: 'glass-soft',
    colorTokens: {
      accent: '#000000',
      accentSoft: 'rgba(0,0,0,0.04)',
      wrong: '#FF3B30',
      right: '#34C759',
      text: '#1C1C1E',
      subtext: 'rgba(28,28,30,0.6)',
      panel: 'rgba(255,255,255,0.75)',
      panelBorder: 'rgba(0,0,0,0.06)',
      bg: '#F5F5F7',
    },
  },
  // NEW: productivity-canvas (The Notion / Obsidian workspace)
  'productivity-canvas': {
    id: 'productivity-canvas',
    backgroundPresetId: 'productivity-canvas',
    motionDefaults: {
      topic_intro: 'snappy-card',
      example_pair: 'snappy-card',
      rule_callout: 'snappy-card',
      recap: 'snappy-card',
    },
    transitionPresetId: 'soft-cut',
    typographyPresetId: 'productivity-canvas',
    surfacePresetId: 'solid-bold',
    colorTokens: {
      accent: '#EB5757',
      accentSoft: 'rgba(235,87,87,0.1)',
      wrong: '#EB5757',
      right: '#219653',
      text: '#37352F',
      subtext: 'rgba(55,53,47,0.65)',
      panel: '#FFFFFF',
      panelBorder: 'rgba(55,53,47,0.09)',
      bg: '#FFFEF8',
    },
  },
  // NEW: documentary-dark (The MasterClass cinematic)
  'documentary-dark': {
    id: 'documentary-dark',
    backgroundPresetId: 'documentary-dark',
    motionDefaults: {
      topic_intro: 'cinematic',
      example_pair: 'cinematic',
      rule_callout: 'cinematic',
      recap: 'cinematic',
    },
    transitionPresetId: 'soft-cut',
    typographyPresetId: 'documentary-dark',
    surfacePresetId: 'glass-dark',
    colorTokens: {
      accent: '#E6E6E6',
      accentSoft: 'rgba(230,230,230,0.1)',
      wrong: '#E53E3E',
      right: '#48BB78',
      text: '#F7FAFC',
      subtext: 'rgba(247,250,252,0.7)',
      panel: 'rgba(26,32,44,0.6)',
      panelBorder: 'rgba(255,255,255,0.1)',
      bg: '#000000',
    },
  },
  // NEW: soft-tech-finance (Modern FinTech)
  'soft-tech-finance': {
    id: 'soft-tech-finance',
    backgroundPresetId: 'soft-tech-finance',
    motionDefaults: {
      topic_intro: 'soft-rise',
      example_pair: 'soft-rise',
      rule_callout: 'soft-rise',
      recap: 'soft-rise',
    },
    transitionPresetId: 'soft-cut',
    typographyPresetId: 'soft-tech-finance',
    surfacePresetId: 'glass-strong',
    colorTokens: {
      accent: '#6366F1',
      accentSoft: 'rgba(99,102,241,0.15)',
      wrong: '#F43F5E',
      right: '#10B981',
      text: '#0F172A',
      subtext: 'rgba(15,23,42,0.68)',
      panel: 'rgba(255,255,255,0.85)',
      panelBorder: 'rgba(99,102,241,0.15)',
      bg: '#F8FAFC',
    },
  },
  // NEW: gamified-learning (Premium Duolingo-inspired)
  'gamified-learning': {
    id: 'gamified-learning',
    backgroundPresetId: 'gamified-learning',
    motionDefaults: {
      topic_intro: 'snappy-card',
      example_pair: 'snappy-card',
      rule_callout: 'snappy-card',
      recap: 'snappy-card',
    },
    transitionPresetId: 'hard-wipe',
    typographyPresetId: 'gamified-learning',
    surfacePresetId: 'solid-bold',
    colorTokens: {
      accent: '#3B82F6',
      accentSoft: 'rgba(59,130,246,0.15)',
      wrong: '#EF4444',
      right: '#22C55E',
      text: '#1E293B',
      subtext: 'rgba(30,41,59,0.75)',
      panel: '#FFFFFF',
      panelBorder: '#E2E8F0',
      bg: '#EFF6FF',
    },
  },
};

export const resolveStylePreset = (stylePresetId?: string): StylePreset =>
  stylePresets[stylePresetId ?? 'editorial-glow'] ?? stylePresets['editorial-glow'];
