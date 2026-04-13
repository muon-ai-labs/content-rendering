# Architecture

## Overview

`content-rendering` is a minimal Remotion repo designed for public cloud rendering only.

The core principle is:

- keep render infrastructure public
- keep private studio logic and proprietary lesson systems out of this repo

## Current Flow

1. A composition is defined in `src/Root.tsx`.
2. GitHub Actions manually triggers the render workflow.
3. Remotion renders the selected composition on a GitHub-hosted runner.
4. The MP4 is uploaded as a workflow artifact.
5. The artifact is downloaded back to a local machine.

## Current Tradeoff

This repo is intentionally generic right now.

That means:

- it proves the free public GitHub Actions render lane works
- it does not yet render the private `muon-ai-studio` production lesson stack

## Future Direction

If this lane continues to work well, future improvements can include:

- secure input manifests
- remote render job selection
- artifact naming conventions
- lightweight upload/download automation
- safer separation between public render code and private production data
