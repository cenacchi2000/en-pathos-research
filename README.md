# En-Pathos

This package documents three evaluations of a conversational support system. The temporal diagnostic measures recovery of a constructed edit. The offline adapter scores recorded replies. The live study measures perceived empathy after a conversation.

[Project website](https://cenacchi2000.github.io/en-pathos-research/) · [Download research source and manifests](https://github.com/cenacchi2000/en-pathos-research/raw/refs/heads/main/en-pathos-source.zip) · [Checkpoint hashes and prompt locations](CHECKPOINTS.md)

## Architecture

| Evaluation | Input and model | Output |
| --- | --- | --- |
| Temporal diagnostic | Twelve grayscale slots with a five-frame forward or reversed segment. An independent temporal encoder predicts order and the changed span. | Strict pair accuracy and span recovery |
| Offline reply scoring | Transcript with an optional eight-frame prefix. Pooled appearance and frame differences feed a temporal encoder and rank-eight LoRA on SmolLM2-135M-Instruct. | Reply-token negative log likelihood and perplexity |
| Live recipient study | Transcript, history, pacing flag and optional participant-confirmed cards condition Gemma 4 12B in the intervention. | Post-conversation PETS |

## Results and interpretation

- The temporal encoder achieved 25.3% strict pair accuracy on 253 held-out pairs. The single middle-frame baseline achieved 8.7%. Instance and grounded-pair accuracy were 53.4% and 17.0%, respectively. These results concern constructed edits.
- Of 18,366 adapter training turns, 3,590 had aligned video. On 2,031 held-out video turns, perplexity was 25.64 for transcript input, 22.99 for ordered descriptors, 22.96 for appearance only, and 22.98 for unrelated same-corpus clips. These comparisons hold the trained checkpoint and target replies fixed.
- The live comparison included 52 complete sessions, 26 per arm. Mean PETS was 78.0 for the intervention and 39.8 for pooled controls. The mean difference was 38.2 points (95% CI 28.0–48.3). The live intervention combined group-specific onboarding, pacing and repetition screening. The temporal adapter was scored offline.

## Reproduce

Unpack `en-pathos-source.zip` into a new directory. Install the Python dependencies listed in code/live/requirements.txt. The live server also uses FFmpeg, a local model endpoint and the configured model weights. Use a fresh ratings database for a local demo. The temporal manifest records source membership and splits. The reply manifests contain hashed source-group and turn identifiers with split and aligned-video flags. The training scripts require prepared records containing transcripts, target replies and descriptors.

Run the temporal trainer with three positional arguments: media directory, MELD annotations, and output directory, plus --manifest manifests/temporal.json. Run the reply trainer with a base checkpoint, prepared JSONL and output directory. For the expanded mixed run add --train-examples 18366 --eval-examples 5154 --epochs 1 --retain-training-video. Exact checkpoint hashes and prompt locations are listed in [CHECKPOINTS.md](CHECKPOINTS.md).

The archive includes implementation code and split metadata. Exact replay also requires the original corpus subsets, checkpoint weights and eligible evaluation records. Participant records and camera footage are excluded.
