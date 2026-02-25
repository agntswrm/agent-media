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

Combine multiple images:
```bash
agent-media image edit --in style.jpg content.jpg --prompt "apply the style of the first image to the second"
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
