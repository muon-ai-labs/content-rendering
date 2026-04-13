# Content Rendering

Minimal public GitHub Actions render lane for 5-minute Remotion long-form videos.

## Purpose

- render-only repo
- no private studio codebase mirror
- no proprietary lesson assets required
- outputs downloadable MP4 artifacts from GitHub Actions

## Local commands

```bash
npm install
npm run build
npm run render:sample
```

## GitHub Actions

Workflow file:

- `.github/workflows/render-longform.yml`

Manual dispatch inputs:

- `theme`: `paper` or `midnight`

Artifact output:

- `rendered-longform-video`
