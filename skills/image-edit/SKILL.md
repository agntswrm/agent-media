---
name: image-edit
description: Edits an existing image using a text prompt. Use when you need to modify, enhance, or transform an image based on text instructions.
---

# Image Edit

Edits one or more images using a text prompt (image-to-image transformation). Supports multiple input images for combining styles, subjects, or scenes.

## Command

```bash
agent-media image edit --in <paths...> --prompt <text> [options]
```

## Inputs

| Option | Required | Description |
|--------|----------|-------------|
| `--in` | Yes | One or more input file paths or URLs |
| `--prompt` | Yes | Text description of the desired edit |
| `--aspect-ratio` | No | Aspect ratio for output (e.g., `1:1`, `16:9`, `auto`) |
| `--resolution` | No | Output resolution (e.g., `1K`, `2K`, `4K`) |
| `--out` | No | Output path, filename or directory (default: ./) |
| `--provider` | No | Provider to use (default: auto-detect) |
| `--model` | No | Model override (e.g., `fal-ai/flux-2/edit`) |

## Output

Returns a JSON object with the edited image path:

```json
{
  "ok": true,
  "media_type": "image",
  "action": "edit",
  "provider": "fal",
  "output_path": "edited_123_abc.png",
  "mime": "image/png",
  "bytes": 567890
}
```

## Examples

Edit a single image:
```bash
agent-media image edit --in photo.jpg --prompt "make the sky more vibrant"
```

Add elements to an image:
```bash
agent-media image edit --in portrait.png --prompt "add sunglasses"
```

Combine multiple images (pass multiple paths after `--in`, separated by spaces):
```bash
agent-media image edit --in person.png landscape.jpg --prompt "place the person from the first image into the landscape from the second image"
```

Multi-image edit with aspect ratio and resolution:
```bash
agent-media image edit --in template.png person.jpg --prompt "Use image one as the template and reframe the person from image two to match" --aspect-ratio 1:1 --resolution 2K --model fal-ai/nano-banana-pro/edit
```

Edit with specific provider:
```bash
agent-media image edit --in scene.jpg --prompt "change to night time" --provider replicate
```

## Providers

This action requires an external provider:
- **fal** - Requires `FAL_API_KEY`
- **replicate** - Requires `REPLICATE_API_TOKEN`
- **runpod** - Requires `RUNPOD_API_KEY`
- **ai-gateway** - Requires `AI_GATEWAY_API_KEY`

The local provider does not support image editing.
