import {staticFile} from 'remotion';

/**
 * DETERMINISTIC OFFLINE FONT REGISTRATION
 * We keep all font assets local, but do not block rendering on explicit font loads.
 * GitHub Actions can time out on FontFace.load(), so we register @font-face rules only.
 */

const injectFontFace = (fontFamily: string, weight: string, url: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  const styleId = `font-${fontFamily}-${weight}`.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @font-face {
      font-family: "${fontFamily}";
      src: url("${staticFile(url)}") format("woff2");
      font-weight: ${weight};
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};

injectFontFace('Inter', '400', '/fonts/inter-400.woff2');
injectFontFace('Inter', '700', '/fonts/inter-700.woff2');

injectFontFace('Montserrat', '400', '/fonts/montserrat-400.woff2');
injectFontFace('Montserrat', '700', '/fonts/montserrat-700.woff2');

injectFontFace('Playfair Display', '400', '/fonts/playfair-display-400.woff2');
injectFontFace('Playfair Display', '700', '/fonts/playfair-display-700.woff2');

injectFontFace('JetBrains Mono', '400', '/fonts/jetbrains-mono-400.woff2');

injectFontFace('Hind Siliguri', '400', '/fonts/hind-siliguri-400.woff2');
injectFontFace('Hind Siliguri', '700', '/fonts/hind-siliguri-700.woff2');

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
