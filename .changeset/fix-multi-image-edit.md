---
"agent-media": minor
"@agent-media/core": minor
"@agent-media/providers": minor
"@agent-media/image": minor
---

Fix multi-image edit and add aspect-ratio/resolution options

- Fix fal provider to use AI SDK's `prompt.images` + `useMultipleImages` instead of raw `image_urls` passthrough
- Add `--aspect-ratio` and `--resolution` CLI options for image edit
- Pass aspect_ratio/resolution through fal, replicate, and runpod providers
