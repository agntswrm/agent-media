# Skill: Video Transcribe

## Description

Transcribes audio or video files to text with timestamps. Supports automatic language detection, speaker identification (diarization), and outputs structured JSON with segment-level timing.

## Command

```bash
agent-media video transcribe --in <path> [options]
```

## Inputs

| Option | Required | Description |
|--------|----------|-------------|
| `--in` | Yes | Input file path or URL (supports mp3, wav, mp4, m4a, webm, ogg) |
| `--diarize` | No | Enable speaker identification |
| `--language` | No | Language code (auto-detected if not provided) |
| `--speakers` | No | Number of speakers hint for diarization |
| `--out` | No | Output directory (default: `.agent-media/`) |
| `--provider` | No | Provider to use (fal, replicate) |

## Output

Returns a JSON object with transcription data:

```json
{
  "ok": true,
  "media_type": "video",
  "action": "transcribe",
  "provider": "fal",
  "output_path": ".agent-media/transcription_123_abc.json",
  "transcription": {
    "text": "Full transcription text...",
    "language": "en",
    "segments": [
      { "start": 0.0, "end": 2.5, "text": "Hello.", "speaker": "SPEAKER_0" },
      { "start": 2.5, "end": 5.0, "text": "Hi there.", "speaker": "SPEAKER_1" }
    ]
  }
}
```

## Examples

Basic transcription (auto-detect language):
```bash
agent-media video transcribe --in interview.mp4
```

Transcription with speaker identification:
```bash
agent-media video transcribe --in meeting.mp4 --diarize
```

Transcription with specific language and speaker count:
```bash
agent-media video transcribe --in podcast.mp3 --diarize --language en --speakers 3
```

Transcribe from URL:
```bash
agent-media video transcribe --in "https://example.com/video.mp4"
```

Use specific provider:
```bash
agent-media video transcribe --in audio.wav --provider replicate
```

## Providers

This action requires an external provider:

### fal

- Requires `FAL_API_KEY`
- Uses `wizper` model for fast transcription (2x faster) when diarization is disabled
- Uses `whisper` model when diarization is enabled (native support)
- Auto-selects optimal model based on options

### replicate

- Requires `REPLICATE_API_TOKEN`
- Uses `whisperx` model with 70x realtime speed
- Diarization requires `HUGGINGFACE_ACCESS_TOKEN` environment variable (for pyannote model access)
- Provides word-level timestamps with alignment

## Environment Variables

| Variable | Provider | Required For |
|----------|----------|--------------|
| `FAL_API_KEY` | fal | All transcription |
| `REPLICATE_API_TOKEN` | replicate | All transcription |
| `HUGGINGFACE_ACCESS_TOKEN` | replicate | Diarization only |
