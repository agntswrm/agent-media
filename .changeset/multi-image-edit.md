---
"agent-media": minor
"@agent-media/core": minor
"@agent-media/image": minor
"@agent-media/providers": minor
---

Add multi-image support for image edit action. The `--in` flag now accepts multiple file paths or URLs, enabling use cases like combining styles, subjects, or scenes from different images. All four cloud providers (fal, replicate, runpod, ai-gateway) support multiple inputs. Single-image usage remains fully backward compatible.
