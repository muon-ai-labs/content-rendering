export type ThemeId = 'paper' | 'midnight';

export type LessonPair = {
  prompt: string;
  answer: string;
  note: string;
};

export type Theme = {
  id: ThemeId;
  bg: string;
  panel: string;
  border: string;
  text: string;
  subtext: string;
  accent: string;
  accentSoft: string;
};

export const THEMES: Record<ThemeId, Theme> = {
  paper: {
    id: 'paper',
    bg: '#f5eee2',
    panel: 'rgba(255,251,244,0.9)',
    border: 'rgba(132, 101, 72, 0.16)',
    text: '#1d2329',
    subtext: 'rgba(29,35,41,0.65)',
    accent: '#b7743f',
    accentSoft: 'rgba(183,116,63,0.14)',
  },
  midnight: {
    id: 'midnight',
    bg: '#08111f',
    panel: 'rgba(15,24,36,0.82)',
    border: 'rgba(255,255,255,0.1)',
    text: '#f5f7fb',
    subtext: 'rgba(245,247,251,0.7)',
    accent: '#67e8f9',
    accentSoft: 'rgba(103,232,249,0.12)',
  },
};

export const LESSON_PAIRS: LessonPair[] = [
  {prompt: 'Advice', answer: 'Advice stays singular in English.', note: 'Use: She gave me good advice.'},
  {prompt: 'News', answer: 'News is singular, even if it sounds plural.', note: 'Use: That is good news.'},
  {prompt: 'Furniture', answer: 'Furniture is uncountable.', note: 'Use: We need new furniture.'},
  {prompt: 'Bread', answer: 'Bread is usually uncountable.', note: 'Use: Can I get some bread?'},
  {prompt: 'Traffic', answer: 'Traffic is uncountable.', note: 'Use: There is a lot of traffic.'},
  {prompt: 'Information', answer: 'Information is uncountable.', note: 'Use: I need more information.'},
];

export const VIDEO_FPS = 30;
export const VIDEO_DURATION_IN_FRAMES = 300 * VIDEO_FPS;
