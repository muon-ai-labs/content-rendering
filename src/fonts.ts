import {staticFile, delayRender, continueRender} from 'remotion';

/**
 * DETERMINISTIC OFFLINE FONT LOADING
 * We avoid live Google Font dependencies to prevent render timeouts on networks with restricted access.
 * These woff2 files are stored in /public/fonts/
 */

const registerFontFace = (fontFamily: string, weight: string, url: string) => {
  if (typeof window === 'undefined') return;
  const handle = delayRender(`Font: ${fontFamily} (${weight})`);
  const fontFace = new FontFace(fontFamily, `url(${staticFile(url)})`, {
    weight,
    style: 'normal',
    display: 'swap',
  });

  fontFace.load().then((loadedFace) => {
    document.fonts.add(loadedFace);
    continueRender(handle);
  }).catch((err) => {
    console.error(`Failed to load font ${fontFamily} ${weight}:`, err);
    continueRender(handle);
  });
};

// Register all required families and weights
registerFontFace('Inter', '400', '/fonts/inter-400.woff2');
registerFontFace('Inter', '700', '/fonts/inter-700.woff2');

registerFontFace('Montserrat', '400', '/fonts/montserrat-400.woff2');
registerFontFace('Montserrat', '700', '/fonts/montserrat-700.woff2');

registerFontFace('Playfair Display', '400', '/fonts/playfair-display-400.woff2');
registerFontFace('Playfair Display', '700', '/fonts/playfair-display-700.woff2');

registerFontFace('JetBrains Mono', '400', '/fonts/jetbrains-mono-400.woff2');

registerFontFace('Hind Siliguri', '400', '/fonts/hind-siliguri-400.woff2');
registerFontFace('Hind Siliguri', '700', '/fonts/hind-siliguri-700.woff2');

// --- Exported font-family strings ---
// We use the family names registered above.

// Sans-serif variants
export const montserrat = '"Montserrat", "Inter", "Segoe UI", sans-serif';
export const inter = '"Inter", "Segoe UI", sans-serif';

// Serif variants
export const playfair = '"Playfair Display", serif';
export const lora = '"Inter", Georgia, serif'; // Fallback to Inter for now to keep it deterministic

// Legacy exports for compatibility
export const serif = lora; 
export const mono = '"JetBrains Mono", "Consolas", monospace';

// Bengali
export const hindSiliguri = '"Hind Siliguri", "Segoe UI", sans-serif';
