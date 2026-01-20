---
"@agent-media/providers": patch
---

Refactor providers to use AI SDK consistently instead of raw fetch calls:
- fal provider: Use AI SDK for image generation, editing, and transcription; fal client SDK only for background removal (not supported in AI SDK)
- replicate provider: Use AI SDK for image generation and editing; replicate SDK for transcription (not supported in AI SDK)
- video-gen: Use fal client SDK and replicate SDK for video generation (not supported in AI SDK)
