import type { MediaResult, ActionContext, MediaInput } from '@agent-media/core';
import { executeAction, globalRegistry } from '@agent-media/core';

export interface EditInput {
  /** One or more input file paths or URLs */
  inputs: string[];
  /** Text prompt describing the desired edit */
  prompt: string;
  /** Output directory (overrides default) */
  out?: string;
  /** Output filename (extension auto-added if missing) */
  name?: string;
  /** Provider to use (overrides auto-detection) */
  provider?: string;
  /** Model to use (overrides provider default) */
  model?: string;
  /** Aspect ratio for output (e.g., "1:1", "16:9", "auto") */
  aspectRatio?: string;
  /** Output resolution (e.g., "1K", "2K", "4K") */
  resolution?: string;
}

/**
 * Edit an image using a text prompt (image-to-image)
 * Supports multiple input images for multi-image editing
 * Requires an external provider (fal, replicate, runpod, ai-gateway)
 */
export async function edit(options: EditInput): Promise<MediaResult> {
  const mediaInputs: MediaInput[] = options.inputs.map((input) => ({
    source: input,
    isUrl: input.startsWith('http://') || input.startsWith('https://'),
  }));

  const context: ActionContext = {
    outputDir: options.out ?? process.cwd(),
    provider: options.provider,
    outputName: options.name,
    inputSource: options.inputs[0],
  };

  return executeAction(
    globalRegistry,
    {
      action: 'edit',
      options: {
        inputs: mediaInputs,
        prompt: options.prompt,
        model: options.model,
        aspectRatio: options.aspectRatio,
        resolution: options.resolution,
      },
    },
    context
  );
}
