# Architecture

## Overview

`content-rendering` is the minimal public render lane for Muon AI long-form videos.

The core principle is:

- keep render infrastructure public
- keep private studio logic and proprietary lesson systems out of this repo
- preserve a working GitHub Actions render path without turning this repo into a copy of `muon-ai-studio`

## Current Flow

1. `src/Root.tsx` exposes two real source compositions:
   - `ActualPaperDepth5Min`
   - `ActualEditorialV55Min`
2. Those compositions load public beat maps from `public/generated/custom-5min/`.
3. `PresentationTemplateV2` renders the long-form lesson flow using the existing intro / content / outro structure.
4. `.github/workflows/render-longform.yml` is manually dispatched in GitHub Actions.
5. The workflow resolves either a single template, the remaining 8 templates, or all 10 templates.
6. `paper-depth` renders directly from the paper composition.
7. The other supported public variants render from the editorial composition with a variant override.
8. Each finished MP4 is uploaded as a separate GitHub Actions artifact.
9. Artifacts are downloaded locally for review and verification.

## Supported Public Templates

The current public render lane supports these 10 template outputs:

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

## Intentional Scope

This repo is intentionally narrow.

It should continue to do these things well:

- render real long-form videos through GitHub Actions
- use actual public-safe template inputs already present in this repo
- keep the current duration strategy intact
- stay minimal and non-confidential

It should avoid these things unless there is a clear need:

- copying private studio systems into this repo
- adding unnecessary local render workflows
- broad refactors that risk the working Actions lane

## Local State

Downloaded MP4s and verification artifacts stay local by default:

- `downloads/` is ignored
- local proof/verification material should stay out of the main repo unless there is a deliberate reason to publish it

## Future Direction

If this lane continues to work well, future improvements can stay incremental:

- cleaner artifact download helpers
- clearer verification documentation
- safer wiring for public template selection
- lightweight automation around render and download steps
