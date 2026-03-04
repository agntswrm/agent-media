# Fix: Use "General Use (Dynamic)" model and resolution for remove-background (fal provider)

## Problem

The fal provider's `remove-background` action hardcodes `'General Use (Light)'` as the birefnet/v2 model variant (line 242 in `packages/providers/src/fal/index.ts`). This produces poor results for high-resolution images (e.g. 2048x2048) because:

1. **Wrong model variant**: `General Use (Light)` doesn't handle high-res images well. `General Use (Dynamic)` supports dynamic resolutions from 256x256 to 2304x2304 and produces significantly better output.
2. **No resolution parameter**: The action doesn't pass a resolution/output size to birefnet. When the input is 2K, the output should also be 2K. Without this, the model may process at a lower resolution and upscale, causing artifacts.

## What needs to change

### 1. Change default model variant

**File:** `packages/providers/src/fal/index.ts`, `executeRemoveBackground` function

```typescript
// Before (line 242)
model: 'General Use (Light)',

// After
model: 'General Use (Dynamic)',
```

### 2. Add resolution support to RemoveBackgroundOptions

**File:** `packages/core/src/types/index.ts`

```typescript
export interface RemoveBackgroundOptions {
  input: MediaInput;
  /** Override default model (e.g., "fal-ai/birefnet/v2") */
  model?: string;
  /** Output resolution (e.g., "2K", "1024x1024"). Only supported by Dynamic model. */
  resolution?: string;
}
```

### 3. Pass resolution through in fal provider

**File:** `packages/providers/src/fal/index.ts`, `executeRemoveBackground` function

Add resolution to `providerOptions.fal` when provided:

```typescript
const providerOptions: Record<string, string | boolean> = {
  model: 'General Use (Dynamic)',
  outputFormat: 'png',
  refineForeground: true,
};

if (options.resolution) {
  providerOptions['resolution'] = options.resolution;
}
```

### 4. Pass resolution from CLI through to action

**File:** `packages/image/src/actions/remove-background.ts`

The `RemoveBackgroundInput` interface already has `model` but needs `resolution`:

```typescript
export interface RemoveBackgroundInput {
  input: string;
  out?: string;
  name?: string;
  provider?: string;
  model?: string;
  resolution?: string;  // NEW
}
```

And pass it through in `executeAction`:

```typescript
return executeAction(
  globalRegistry,
  {
    action: 'remove-background',
    options: {
      input,
      model: options.model,
      resolution: options.resolution,
    },
  },
  context
);
```

### 5. CLI argument parsing

Ensure the CLI parser for `image remove-background` accepts `--resolution` and passes it to the action. Check `packages/agent-media/src/index.ts` for the CLI entry point.

## Expected usage after fix

```bash
# Default: uses Dynamic model, no resolution constraint
agent-media image remove-background --in photo.png --out output.png --provider fal

# With resolution: uses Dynamic model at 2K
agent-media image remove-background --in photo.png --out output.png --provider fal --resolution 2K
```

## Context

The speaker image pipeline for Applied AI Conf produces 2048x2048 square images in Step 1. When removing backgrounds in Step 2, the `General Use (Light)` model produces noticeably worse results than `General Use (Dynamic)` at this resolution.

## References

- [fal.ai birefnet/v2 API docs](https://fal.ai/models/fal-ai/birefnet/v2/api)
- Available model variants: `General Use (Light)`, `General Use (Light 2K)`, `General Use (Heavy)`, `General Use (Dynamic)`, `Matting`, `Portrait`
- Only `General Use (Dynamic)` supports the full 256x256 to 2304x2304 resolution range
