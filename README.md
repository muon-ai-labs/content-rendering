# Content Rendering

Minimal public render-only repo for producing downloadable long-form MP4s with Remotion and GitHub Actions.

## What This Repo Is

- a dedicated public render lane for Muon AI long-form videos
- intentionally separate from `muon-ai-studio`
- safe to expose because it contains no private lesson pipeline or proprietary app code
- optimized for real 5-minute long-form renders on GitHub Actions

## What This Repo Is Not

- not the studio repo
- not the lesson authoring system
- not the private production asset library
- not a place for local heavy renders by default

## Current Capability

- renders real 1920x1080 long-form MP4s through GitHub Actions
- keeps the current intro / lesson / outro structure intact
- extends duration through the existing lesson/example structure already in the beat maps
- supports these 10 template variants through the public Actions lane:
  - `paper-depth`
  - `editorial-v5`
  - `guided-v4`
  - `app-hybrid-v5`
  - `structured-flow-v5`
  - `neo-minimal`
  - `productivity-canvas`
  - `documentary-dark`
  - `soft-tech-finance`
  - `gamified-learning`

## Render Flow

1. `src/Root.tsx` exposes the two real source compositions:
   - `ActualPaperDepth5Min`
   - `ActualEditorialV55Min`
2. `.github/workflows/render-longform.yml` is manually dispatched in GitHub Actions.
3. The workflow selects a template set:
   - `single`
   - `remaining-8`
   - `all-10`
4. `paper-depth` renders from the paper composition directly.
5. The other supported templates render from the editorial composition with a variant override.
6. GitHub Actions uploads each finished MP4 as a downloadable artifact.
7. Finished MP4s are downloaded back to the local machine for review.

## Repo Structure

- `src/index.ts`: Remotion root registration
- `src/Root.tsx`: actual long-form compositions exposed to Remotion
- `src/presentations-v2/PresentationTemplateV2.tsx`: shared presentation renderer used by the long-form compositions
- `src/presentations-v2/beats/BeatRenderers.tsx`: beat-level rendering, including CTA-related beat rendering
- `public/generated/custom-5min/`: public beat maps used for the current real 5-minute renders
- `.github/workflows/render-longform.yml`: manual GitHub Actions render workflow

## Local Commands

```bash
npm install
npm run build
npm run render:paper
npm run render:editorial
```

Local rendering is useful for quick debugging, but final verification renders should go through GitHub Actions so the public render lane stays the source of truth.

## GitHub Actions

Workflow:

- `.github/workflows/render-longform.yml`

Manual dispatch inputs:

- `render_set`: `single`, `remaining-8`, or `all-10`
- `template`: one of the 10 supported templates when `render_set=single`

Artifacts:

- `rendered-<template>`

## Why It Exists

This repo exists to keep the render lane minimal, public, and non-confidential while still proving that real long-form videos can be rendered in GitHub Actions and downloaded locally. It should stay small, focused, and separate from private studio logic.
