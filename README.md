# Content Rendering

Minimal public render-only repo for producing downloadable long-form MP4s with Remotion and GitHub Actions.

## What This Repo Is

- a dedicated public render lane
- intentionally separate from `muon-ai-studio`
- safe to expose because it contains no private lesson pipeline or proprietary app code
- optimized first for 5-minute long-form video rendering on free public GitHub Actions

## What This Repo Is Not

- not the studio repo
- not the lesson authoring system
- not the voice generation pipeline
- not the asset library for private production content

## Current Capability

- renders 1920x1080 five-minute Remotion videos
- supports two proof themes:
  - `paper`
  - `midnight`
- uploads MP4s as GitHub Actions artifacts for download

## Repo Structure

- `src/index.ts`: Remotion root registration
- `src/Root.tsx`: compositions exposed to Remotion
- `src/LongFormFiveMinute.tsx`: minimal 5-minute long-form renderer
- `src/data.ts`: theme and lesson demo data
- `.github/workflows/render-longform.yml`: manual GitHub Actions render workflow
- `scripts/download-latest-artifact.ps1`: helper to download the latest render artifact locally

## Local Commands

```bash
npm install
npm run build
npm run render:sample
npm run render:paper
npm run render:midnight
```

## GitHub Actions

Workflow:

- `.github/workflows/render-longform.yml`

Manual dispatch input:

- `theme`: `paper` or `midnight`

Artifact:

- `rendered-longform-video`

## Why It Exists

This repo is the first step toward a free cloud-ish render lane for long-form content. The goal is to keep rendering infrastructure public and minimal while keeping the actual studio pipeline private.
