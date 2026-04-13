import React from 'react';
import {AbsoluteFill, Audio, Sequence, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {montserrat} from '../fonts';
import {BeatRenderer} from './beats/BeatRenderers';
import {resolveStylePreset} from '../video-spec/presets';
import {validateBeatMap} from '../video-spec/validate';
import type {BeatMap} from '../video-spec/types';

const msToFrames = (ms: number, fps: number) => Math.max(1, Math.round((ms / 1000) * fps));


// ---------------------------------------------------------------------------
// BackgroundLayer
//
// Accent vocabulary per template family:
//
//   paper-depth / editorial-v5
//     â†’ Print registration: small + crosses, corner crop ticks, thin column
//       rules. Warm ink tones for paper-depth, pure black for editorial-v5.
//       Slow, almost imperceptible drift â€” like paper breathing.
//
//   guided-v4 / productivity-canvas
//     â†’ Workspace markers: horizontal rule fragments, small open squares
//       (checkbox outlines), tab-stop dashes. Organized, structured, calm.
//
//   app-hybrid-v5 / soft-tech-finance
//     â†’ Interface chrome: small pill fragments, connection dots, subtle
//       grid-node clusters. No text, no brackets. Polished and precise.
//
//   structured-flow-v5 / documentary-dark
//     â†’ Schematic / cinematic: dashed scan lines, small precise circles
//       with crosshair centres, single node dots. Blueprint or film-frame
//       feeling. Slow drift.
//
//   neo-minimal / gamified-learning
//     â†’ neo-minimal: micro squares, arcs, dots â€” near-black, very faint,
//       geometric. gamified: consistent rounded pills and circles in brand
//       blue at low opacity, uniform scale.
//
// Motion rules (per family):
//   - Paper / editorial: very slow (speed 180â€“280), amplitude (12â€“20px)
//   - Workspace / canvas: slow (speed 140â€“240), amplitude (14â€“22px)
//   - App / fintech: medium-slow (speed 120â€“200), amplitude (12â€“20px)
//   - Schematic / cinematic: very slow (speed 200â€“300), amplitude (10â€“18px)
//   - Minimal / gamified: slow (speed 140â€“220), amplitude (14â€“24px)
//
// Opacity rules: all accents stay in the 0.25â€“0.40 range â€” clearly
// visible at a glance but never competing with lesson content. Colour-on-dark families use white-tinted
// marks; colour-on-light families use dark-tinted marks.
// ---------------------------------------------------------------------------

const BackgroundLayer: React.FC<{stylePresetId: string}> = ({stylePresetId}) => {

  const preset = resolveStylePreset(stylePresetId);
  const {width, height} = useVideoConfig();
  const frame = useCurrentFrame();

  // Shared motion helpers
  const dX = (seed: number, speed: number, amp: number) =>
    Math.sin((frame + seed * 137) / speed) * amp;
  const dY = (seed: number, speed: number, amp: number) =>
    Math.cos((frame + seed * 137) / speed) * amp;

  const parallaxX = (speed: number, amount: number) => Math.sin(frame / speed) * amount;
  const parallaxY = (speed: number, amount: number) => Math.cos(frame / speed) * amount;

  // Shared "old glow float" helper (used only for legacy short-form presets)
  const floating = (x: number, y: number, size: number, color: string, speed: number, opacity = 0.22): React.CSSProperties => ({
    position: 'absolute', left: x, top: y + Math.sin(frame / speed) * 30, width: size, height: size,
    borderRadius: '50%', background: color, filter: 'blur(100px)', opacity: opacity,
  });

  return (
    <AbsoluteFill style={{background: preset.colorTokens.bg, overflow: 'hidden'}}>

      {/* ================================================================
          FAMILY 1 & 2 â€” PAPER-DEPTH / EDITORIAL-V5
          Motif: print registration marks â€” small + crosses, corner crop
          ticks, thin vertical column rule. Ink tones; very slow drift.
          ================================================================ */}
      {/* editorial-v5: Metric Glitters & Paper Flecks */}
      {preset.backgroundPresetId === 'editorial-v5' ? (() => {
        const c = (a: number) => `rgba(0,0,0,${a})`;
        const flicker = (seed: number) => 0.7 + 0.3 * Math.sin((frame / 20) + seed);
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: '#FFFFFF'}} />
            <div style={{position: 'absolute', inset: 0, opacity: 0.24, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.22) 0.7px, transparent 0)', backgroundSize: '14px 14px'}} />
            
            {/* 4-Point Glitter Star â€” Top Left */}
            <div style={{position: 'absolute', top: '15%', left: '10%', width: 44, height: 44, background: c(0.40), clipPath: 'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)', opacity: flicker(1), transform: `translate(${dX(1, 280, 16)}px, ${dY(1, 260, 16)}px)`}} />
            
            {/* Shimmering Fleck â€” Mid Right */}
            <div style={{position: 'absolute', top: '40%', right: '12%', width: 24, height: 8, background: c(0.30), borderRadius: '50%', opacity: flicker(2), transform: `rotate(45deg) translate(${dX(2, 220, 12)}px, ${dY(2, 300, 12)}px)`}} />
            
            {/* Pair of Glitters â€” Bottom Left */}
            <div style={{position: 'absolute', bottom: '20%', left: '14%', transform: `translate(${dX(3, 250, 16)}px, ${dY(3, 270, 16)}px)`}}>
               <div style={{width: 32, height: 32, background: c(0.35), clipPath: 'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)', opacity: flicker(3)}} />
               <div style={{width: 16, height: 16, background: c(0.25), clipPath: 'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)', marginLeft: 20, marginTop: -8, opacity: flicker(4)}} />
            </div>

            {/* Micro Fleck â€” Top Right */}
            <div style={{position: 'absolute', top: '12%', right: '20%', width: 6, height: 6, borderRadius: '50%', background: c(0.40), opacity: flicker(5), transform: `translate(${dX(4, 300, 12)}px, ${dY(4, 280, 12)}px)`}} />
          </>
        );
      })() : null}


      {/* paper-depth: Analog Ink Circles & Dots */}
      {preset.backgroundPresetId === 'paper-depth' ? (() => {
        const c = (a: number) => `rgba(120,88,52,${a})`;
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(155deg, #F7F0E6 0%, #EFE6D7 100%)'}} />
            <div style={{position: 'absolute', inset: 0, opacity: 0.24, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.22) 0.7px, transparent 0)', backgroundSize: '14px 14px'}} />
            
            <div style={{position: 'absolute', top: '12%', left: '10%', width: 48, height: 48, borderRadius: '50%', background: c(0.40), transform: `translate(${dX(1, 280, 16)}px, ${dY(1, 260, 16)}px)`}} />
            <div style={{position: 'absolute', bottom: '10%', right: '8%', width: 56, height: 56, borderRadius: '50%', border: `4px solid ${c(0.35)}`, transform: `translate(${dX(2, 260, 18)}px, ${dY(2, 300, 18)}px)`}} />
            <div style={{position: 'absolute', top: '48%', left: '6%', transform: `translate(${dX(3, 300, 12)}px, ${dY(3, 280, 12)}px)`}}>
               <div style={{width: 12, height: 12, borderRadius: '50%', background: c(0.30), marginBottom: 8}} />
               <div style={{width: 12, height: 12, borderRadius: '50%', background: c(0.25)}} />
            </div>
            <div style={{position: 'absolute', bottom: '22%', right: '15%', width: 24, height: 24, borderRadius: '50%', border: `3px solid ${c(0.40)}`, transform: `translate(${dX(4, 220, 14)}px, ${dY(4, 200, 14)}px)`}} />
            <div style={{position: 'absolute', left: 82 + dX(5, 240, 6), top: '40%', width: 8, height: 8, borderRadius: '50%', background: c(0.35)}} />
          </>
        );
      })() : null}



      {/* ================================================================
          FAMILY 3 & 4 â€” GUIDED-V4 / PRODUCTIVITY-CANVAS
          Motif: workspace structure marks â€” ruled line fragments, small
          checkbox outlines, tab-stop dashes. Calm, organized, educational.
          ================================================================ */}
      {/* guided-v4: Intellectual Starbursts & Fireworks */}
      {preset.backgroundPresetId === 'guided-v4' ? (() => {
        const m = (a: number) => `rgba(100,116,139,${a})`;
        const ac = (a: number) => `rgba(255,107,0,${a})`;
        const flare = (seed: number) => 0.8 + 0.2 * Math.sin((frame / 15) + seed);
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)'}} />
            <div style={{position: 'absolute', left: 120 + parallaxX(180, 5), top: 0, bottom: 0, width: 1.5, background: 'rgba(255,107,0,0.14)'}} />
            
            {/* Starburst â€” Top Right */}
            <div style={{position: 'absolute', top: '15%', right: '12%', width: 64, height: 64, background: m(0.40), clipPath: 'polygon(50% 0%, 58% 38%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 42% 38%)', transform: `scale(${flare(1)}) translate(${dX(1, 180, 20)}px, ${dY(1, 160, 18)}px)`}} />
            
            {/* Firework Ring Fragment â€” Bottom Left */}
            <div style={{position: 'absolute', bottom: '18%', left: '15%', width: 56, height: 56, border: `4px dashed ${m(0.45)}`, borderRadius: '50%', transform: `scale(${flare(2)}) translate(${dX(2, 160, 22)}px, ${dY(2, 180, 20)}px)`}} />
            
            {/* Discovery Bursts â€” Mid Right */}
            <div style={{position: 'absolute', top: '45%', right: '15%', transform: `translate(${dX(3, 220, 16)}px, ${dY(3, 240, 16)}px)`}}>
               <div style={{width: 32, height: 32, background: ac(0.50), clipPath: 'polygon(50% 0%, 58% 38%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 42% 38%)', opacity: flare(3)}} />
               <div style={{width: 14, height: 14, background: m(0.30), borderRadius: '50%', marginTop: 12, marginLeft: 10, opacity: flare(4)}} />
            </div>

            {/* Tiny Floating Star â€” Top Left */}
            <div style={{position: 'absolute', top: '10%', left: '12%', width: 18, height: 18, background: ac(0.40), clipPath: 'polygon(50% 0%, 58% 38%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 42% 38%)', transform: `translate(${dX(4, 200, 14)}px, ${dY(4, 220, 14)}px)`}} />
          </>
        );
      })() : null}


      {/* productivity-canvas: Action Dashboard Checkmarks & Rules */}
      {preset.backgroundPresetId === 'productivity-canvas' ? (() => {
        const m = (a: number) => `rgba(55,53,47,${a})`;
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: '#FFFEF8'}} />
            <div style={{position: 'absolute', left: 120 + parallaxX(180, 5), top: 0, bottom: 0, width: 1.5, background: 'rgba(200,50,50,0.12)'}} />
            
            <div style={{position: 'absolute', top: '15%', right: '12%', width: 44, height: 44, border: `4px solid ${m(0.45)}`, borderRadius: 4, transform: `translate(${dX(1, 180, 20)}px, ${dY(1, 160, 18)}px)`}}>
               <div style={{position: 'absolute', top: 8, left: 14, width: 8, height: 18, borderBottom: `4px solid ${m(0.45)}`, borderRight: `4px solid ${m(0.45)}`, transform: 'rotate(45deg)'}} />
            </div>
            <div style={{position: 'absolute', bottom: '20%', left: '18%', width: 60, height: 4, background: m(0.35), transform: `translate(${dX(2, 220, 16)}px, ${dY(2, 240, 16)}px)`}} />
            <div style={{position: 'absolute', top: '40%', right: '8%', width: 80, height: 4, background: m(0.25), transform: `translate(${dX(3, 200, 18)}px, ${dY(3, 190, 18)}px)`}} />
            <div style={{position: 'absolute', bottom: '15%', right: '15%', width: 32, height: 32, border: `3.5px solid ${m(0.40)}`, borderRadius: 4, transform: `translate(${dX(4, 260, 22)}px, ${dY(4, 210, 22)}px)`}} />
          </>
        );
      })() : null}



      {/* ================================================================
          FAMILY 5 & 6 â€” APP-HYBRID-V5 / SOFT-TECH-FINANCE
          Motif: interface chrome â€” small pill fragments, connection dots,
          grid-node clusters. No text or arbitrary symbols. Polished, calm.
          ================================================================ */}
      {/* app-hybrid-v5: Interface Pills & Circles */}
      {preset.backgroundPresetId === 'app-hybrid-v5' ? (() => {
        const p = (a: number) => `rgba(129,140,248,${a})`;
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #13151A 0%, #0B0C0F 100%)'}} />
            <div style={{position: 'absolute', top: '15%', right: '12%', width: 80, height: 28, borderRadius: 14, border: `4px solid ${p(0.50)}`, transform: `translate(${dX(1, 150, 18)}px, ${dY(1, 130, 16)}px)`}} />
            <div style={{position: 'absolute', bottom: '20%', left: '15%', width: 64, height: 24, borderRadius: 12, background: p(0.40), transform: `translate(${dX(2, 200, 20)}px, ${dY(2, 220, 18)}px)`}} />
            <div style={{position: 'absolute', top: '48%', right: '10%', width: 20, height: 20, borderRadius: '50%', border: `3.5px solid ${p(0.45)}`, transform: `translate(${dX(3, 180, 14)}px, ${dY(3, 160, 12)}px)`}} />
            <div style={{position: 'absolute', bottom: '15%', right: '18%', width: 14, height: 14, borderRadius: '50%', background: p(0.35), transform: `translate(${dX(4, 220, 16)}px, ${dY(4, 240, 16)}px)`}} />
          </>
        );
      })() : null}

      {/* soft-tech-finance: Glass Bubbles & Liquid Spheres */}
      {preset.backgroundPresetId === 'soft-tech-finance' ? (() => {
        const p = (a: number) => `rgba(99,102,241,${a})`;
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #F0F4F8 0%, #E2E8F0 100%)'}} />
            
            {/* Highlighted Glass Bubble â€” Top Right */}
            <div style={{position: 'absolute', top: '15%', right: '15%', width: 72, height: 72, borderRadius: '50%', border: `3.5px solid ${p(0.35)}`, background: `radial-gradient(circle at 30% 30%, ${p(0.12)} 0%, transparent 60%)`, transform: `translate(${dX(1, 150, 18)}px, ${dY(1, 130, 24)}px)`}}>
               <div style={{position: 'absolute', top: '15%', left: '20%', width: 12, height: 6, background: '#FFFFFF', borderRadius: '50%', opacity: 0.6, transform: 'rotate(-30deg)'}} />
            </div>

            {/* Liquid Sphere â€” Bottom Left */}
            <div style={{position: 'absolute', bottom: '22%', left: '12%', width: 88, height: 88, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${p(0.30)} 0%, ${p(0.10)} 100%)`, filter: 'blur(2px)', transform: `translate(${dX(2, 200, 22)}px, ${dY(2, 220, 28)}px)`}} />

            {/* Floating Orb Node â€” Mid Right */}
            <div style={{position: 'absolute', top: '45%', right: '8%', width: 32, height: 32, borderRadius: '50%', border: `3px solid ${p(0.40)}`, background: p(0.05), transform: `translate(${dX(3, 180, 16)}px, ${dY(3, 160, 20)}px)`}} />

            {/* Tiny Glass Pearl â€” Top Left */}
            <div style={{position: 'absolute', top: '10%', left: '15%', width: 14, height: 14, borderRadius: '50%', background: p(0.45), boxShadow: `0 0 10px ${p(0.30)}`, transform: `translate(${dX(4, 210, 14)}px, ${dY(4, 190, 18)}px)`}} />
          </>
        );
      })() : null}




      {/* ================================================================
          FAMILY 7 & 8 â€” STRUCTURED-FLOW-V5 / DOCUMENTARY-DARK
          Motif: schematic / cinematic â€” small precise circles with
          crosshair centres, dashed scan-line fragments, single node dots.
          Very slow drift; no large shapes.
          ================================================================ */}
      {/* structured-flow-v5: Atmospheric Floating Clouds */}
      {/* structured-flow-v5: Multi-Lobed Puffy Clouds (Reference Match) */}
      {/* structured-flow-v5: 2 Refined Puffy Cloud Variants */}
      {preset.backgroundPresetId === 'structured-flow-v5' ? (() => {
        const p = (a: number) => `rgba(255,255,255,${a})`;
        const PuffyCloudA = ({opacity}: {opacity: number}) => (
          <svg width="120" height="75" viewBox="0 0 100 60" fill={p(opacity)} xmlns="http://www.w3.org/2000/svg">
            <path d="M20,50 C10,50 5,42 5,35 C5,20 20,15 25,18 C28,10 40,5 50,5 C62,5 72,12 76,22 C86,20 95,25 95,38 C95,50 85,55 75,52 L20,52 Z" />
          </svg>
        );
        const PuffyCloudB = ({opacity}: {opacity: number}) => (
          <svg width="110" height="70" viewBox="0 0 100 60" fill={p(opacity)} xmlns="http://www.w3.org/2000/svg">
            <path d="M15,45 C8,45 3,38 3,30 C3,18 15,14 18,18 C20,8 35,4 45,4 C56,4 65,10 68,18 C78,16 88,20 88,32 C88,42 80,47 70,45 L15,45 Z" />
          </svg>
        );
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #172554 0%, #0F1A3A 100%)'}} />
            
            {/* Reduced Variant 1 â€” Top Leftish */}
            <div style={{position: 'absolute', top: '20%', left: '15%', transform: `scale(1.0) translate(${dX(1, 440, 45)}px, ${dY(1, 480, 10)}px)`}}>
               <PuffyCloudA opacity={0.16} />
            </div>

            {/* Reduced Variant 2 â€” Bottom Rightish */}
            <div style={{position: 'absolute', bottom: '25%', right: '18%', transform: `scale(0.85) translate(${dX(2, 380, 50)}px, ${dY(2, 420, 12)}px)`}}>
               <PuffyCloudB opacity={0.12} />
            </div>
          </>
        );
      })() : null}





      {/* documentary-dark: Telemetry Starbursts & Crosshairs */}
      {preset.backgroundPresetId === 'documentary-dark' ? (() => {
        const p = (a: number) => `rgba(255,255,255,${a})`;
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, #1A202C 0%, #000000 70%)'}} />
            <div style={{position: 'absolute', top: '15%', left: '15%', transform: `translate(${dX(1, 220, 16)}px, ${dY(1, 240, 16)}px)`}}>
               <div style={{width: 48, height: 48, background: p(0.45), clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
            </div>
            <div style={{position: 'absolute', bottom: '22%', right: '15%', width: 44, height: 44, border: `3.5px solid ${p(0.40)}`, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', transform: `translate(${dX(2, 300, 18)}px, ${dY(2, 320, 18)}px)`}} />
            <div style={{position: 'absolute', top: '42%', right: '10%', width: 14, height: 14, borderRadius: '50%', background: p(0.35), transform: `translate(${dX(3, 260, 12)}px, ${dY(3, 240, 12)}px)`}} />
          </>
        );
      })() : null}



      {/* ================================================================
          FAMILY 9 & 10 â€” NEO-MINIMAL / GAMIFIED-LEARNING
          neo-minimal: pure micro-geometry â€” scaled squares, arcs, dots.
          gamified: bold pills and circles. Consistent scale, clear visibility.
          ================================================================ */}
      {/* neo-minimal: 3 Standardized Paper Planes */}
      {preset.backgroundPresetId === 'neo-minimal' ? (() => {
        const p = (a: number) => `${preset.colorTokens.accent}${Math.floor(a * 255).toString(16).padStart(2, '0')}`;
        const PaperPlane = ({opacity}: {opacity: number}) => (
          <svg width="80" height="80" viewBox="0 0 24 24" fill={p(opacity)} xmlns="http://www.w3.org/2000/svg">
            <path d="M21,12L3,21L4.91,12L3,3L21,12M6.19,12L19.5,12L6.19,12Z" />
          </svg>
        );
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: '#F9FAFB'}} />
            
            {/* Standard Position A â€” Top Left */}
            <div style={{position: 'absolute', top: '15%', left: '10%', transform: `scale(1.1) rotate(-25deg) translate(${dX(1, 400, 75)}px, ${dY(1, 420, 20)}px)`}}>
               <PaperPlane opacity={0.20} />
            </div>

            {/* Standard Position B â€” Bottom Right */}
            <div style={{position: 'absolute', bottom: '15%', right: '10%', transform: `scale(1.0) rotate(15deg) translate(${dX(2, 380, 70)}px, ${dY(2, 400, 15)}px)`}}>
               <PaperPlane opacity={0.18} />
            </div>

            {/* Standard Position C â€” Bottom Leftish */}
            <div style={{position: 'absolute', bottom: '25%', left: '15%', transform: `scale(0.8) rotate(-10deg) translate(${dX(3, 440, 80)}px, ${dY(3, 460, 25)}px)`}}>
               <PaperPlane opacity={0.16} />
            </div>
          </>
        );
      })() : null}










      {/* gamified-learning: Playful Concentric Ringtones & Bubbles */}
      {preset.backgroundPresetId === 'gamified-learning' ? (() => {
        return (
          <>
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 100%)'}} />
            <div style={{position: 'absolute', top: '16%', right: '12%', width: 72, height: 72, border: '4.5px solid rgba(59,130,246,0.45)', borderRadius: '50%', transform: `translate(${dX(1, 150, 24)}px, ${dY(1, 130, 22)}px)`}}>
               <div style={{position: 'absolute', inset: 12, border: '3px solid rgba(59,130,246,0.30)', borderRadius: '50%'}} />
            </div>
            <div style={{position: 'absolute', bottom: '22%', left: '15%', width: 44, height: 44, background: 'rgba(14,165,233,0.40)', borderRadius: '50%', transform: `translate(${dX(2, 180, 22)}px, ${dY(2, 160, 20)}px)`}} />
            <div style={{position: 'absolute', top: '22%', left: '12%', width: 24, height: 24, border: '3.5px solid rgba(59,130,246,0.35)', borderRadius: '50%', transform: `translate(${dX(3, 170, 22)}px, ${dY(3, 190, 20)}px)`}} />
          </>
        );
      })() : null}






      {/* ================================================================
          LEGACY SHORT-FORM PRESETS â€” unchanged
          ================================================================ */}
      {preset.backgroundPresetId === 'editorial-glow' ? (
        <>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(145deg, ${preset.colorTokens.bg} 0%, #112033 55%, #0b1521 100%)`}} />
          <div style={floating(width * 0.12, height * 0.22, 320, preset.colorTokens.accentSoft, 46)} />
          <div style={floating(width * 0.72, height * 0.12, 420, 'rgba(255,255,255,0.06)', 62)} />
        </>
      ) : null}
      {preset.backgroundPresetId === 'glass-neon' ? (
        <>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(155deg, #031019 0%, #072133 48%, #031019 100%)'}} />
          <div style={{position: 'absolute', inset: -100, backgroundImage: 'linear-gradient(rgba(77,231,207,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(77,231,207,0.08) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.24, transform: `translate(${parallaxX(180, 10)}px, ${parallaxY(180, 10)}px)`}} />
          <div style={floating(width * 0.16, height * 0.60, 360, 'rgba(77,231,207,0.12)', 38)} />
          <div style={floating(width * 0.70, height * 0.18, 300, 'rgba(96,92,255,0.10)', 54)} />
        </>
      ) : null}
      {preset.backgroundPresetId === 'kinetic-contrast' ? (
        <>
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #08111f 0%, #10233a 50%, #08111f 100%)'}} />
          <div style={{position: 'absolute', top: -120 + parallaxY(150, 40), left: -160 + parallaxX(150, 40), width: 540, height: 540, borderRadius: '50%', background: 'rgba(255,155,61,0.12)', filter: 'blur(100px)'}} />
          <div style={{position: 'absolute', bottom: -160 + parallaxY(180, 40), right: -120 + parallaxX(180, 40), width: 460, height: 460, borderRadius: '50%', background: 'rgba(122,255,77,0.08)', filter: 'blur(100px)'}} />
        </>
      ) : null}
      {preset.backgroundPresetId === 'cinematic-dark' ? (
        <>
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 10%, #23212c 0%, #07080c 62%, #020307 100%)'}} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 0%, rgba(215,164,109,0.05) 36%, transparent 52%)', transform: `translateX(${parallaxX(64, 80)}px)`}} />
          <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 180px rgba(0,0,0,0.48)'}} />
        </>
      ) : null}

      {/* Top accent bar â€” present on all templates */}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${preset.colorTokens.accent}, ${preset.colorTokens.accentSoft})`, opacity: 0.9}} />
    </AbsoluteFill>
  );
};

type PresentationVariant = 'default' | 'editorial' | 'guided' | 'app-hybrid' | 'structured-flow' | 'neo-minimal' | 'productivity-canvas' | 'documentary-dark' | 'soft-tech-finance' | 'gamified-learning';

type Props = {
  beatMap?: BeatMap;
  beatMapPath?: string;
  variant?: PresentationVariant;
};

const useResolvedBeatMap = (beatMap?: BeatMap, beatMapPath?: string) => {
  const [resolvedBeatMap, setResolvedBeatMap] = React.useState<BeatMap | null>(beatMap ?? null);
  const [handle] = React.useState(() => delayRender('Loading beat map'));

  React.useEffect(() => {
    if (beatMap) {
      setResolvedBeatMap(beatMap);
      continueRender(handle);
      return;
    }

    if (!beatMapPath) {
      cancelRender(new Error('PresentationTemplateV2 requires beatMap or beatMapPath.'));
      return;
    }

    let mounted = true;
    fetch(staticFile(beatMapPath))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load beat map from ${beatMapPath}`);
        }
        return response.json();
      })
      .then((data: BeatMap) => {
        if (!mounted) {
          return;
        }
        setResolvedBeatMap(data);
        continueRender(handle);
      })
      .catch((error: Error) => {
        cancelRender(error);
      });

    return () => {
      mounted = false;
    };
  }, [beatMap, beatMapPath]);

  return resolvedBeatMap;
};

export const PresentationTemplateV2: React.FC<Props> = ({beatMap, beatMapPath, variant = 'default'}) => {
  const {fps} = useVideoConfig();
  const frame = useCurrentFrame();
  const resolvedBeatMap = useResolvedBeatMap(beatMap, beatMapPath);

  if (!resolvedBeatMap) {
    return <AbsoluteFill style={{background: '#020611'}} />;
  }

  // Resolve the effective style preset based on the variant override (V5 system for 3 targets)
  let effectiveStylePresetId = resolvedBeatMap.stylePresetId;
  if (variant === 'editorial' || variant === 'app-hybrid' || variant === 'structured-flow') {
    effectiveStylePresetId = `${variant}-v5`;
  } else if (variant === 'guided') {
     effectiveStylePresetId = `guided-v4`;
  } else if (variant === 'neo-minimal' || variant === 'productivity-canvas' || variant === 'documentary-dark' || variant === 'soft-tech-finance' || variant === 'gamified-learning') {
     effectiveStylePresetId = variant;
  }

  const stylePreset = resolveStylePreset(effectiveStylePresetId);
  const errors = validateBeatMap(resolvedBeatMap);

  if (errors.length > 0) {
    throw new Error(`Invalid BeatMap:\n${errors.join('\n')}`);
  }

  const totalDurationMs = Math.max(
    ...resolvedBeatMap.audioSegments.map((segment) => segment.startMs + segment.durationMs),
    ...resolvedBeatMap.beats.map((beat) => beat.endMs),
    1000,
  );
  const totalFrames = msToFrames(totalDurationMs, fps);
  const progress = Math.min(100, (frame / totalFrames) * 100);
  const lessonNumberSource =
    beatMapPath ??
    resolvedBeatMap.audioSegments[0]?.src ??
    resolvedBeatMap.lessonId;
  const lessonNumberMatch = String(lessonNumberSource).match(/lessons-(\d+)-/);
  const lessonNumber = lessonNumberMatch ? parseInt(lessonNumberMatch[1], 10) : 1;
  const isAppCta = lessonNumber % 2 === 0;

  return (
    <AbsoluteFill style={{fontFamily: montserrat}}>
      <BackgroundLayer stylePresetId={effectiveStylePresetId} />
      <div style={{position: 'absolute', top: 44, left: 78, right: 78, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: stylePreset.colorTokens.subtext, fontSize: 13, fontWeight: 900, letterSpacing: 2, zIndex: 20}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <div style={{width: 8, height: 8, borderRadius: '50%', background: stylePreset.colorTokens.accent}} />
          <span style={{opacity: 0.8}}>Free lessons</span>
          <span style={{opacity: 0.4}}>&bull;</span>
          <span style={{color: stylePreset.colorTokens.text}}>
            {isAppCta ? 'Download "Muon AI" Android App' : 'muonaiapp.com'}
          </span>
        </div>
      </div>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'rgba(0,0,0,0.16)', zIndex: 30}}>
        <div style={{width: `${progress}%`, height: '100%', background: stylePreset.colorTokens.accent}} />
      </div>
      {resolvedBeatMap.audioSegments.map((segment) => (
        <Sequence key={segment.id} from={msToFrames(segment.startMs, fps)} durationInFrames={msToFrames(segment.durationMs, fps)}>
          <Audio src={staticFile(segment.src)} />
        </Sequence>
      ))}
      {resolvedBeatMap.beats.map((beat) => (
        <Sequence key={beat.id} from={msToFrames(beat.startMs, fps)} durationInFrames={msToFrames(beat.endMs - beat.startMs, fps)}>
          <BeatRenderer beat={beat} stylePresetId={effectiveStylePresetId} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

