# Archived runtime and checkpoint identities

SmolLM2-135M-Instruct base revision: 12fd25f77366fa6b3b4b768ec3050bf629380bac.

The exact archived server prompts are in code/live/server.py and the offline trainer prompt is in code/en-pathos-listener/train.py. Current local model manifests can be verified with the following checksums. Historical live requests did not log registry digests per turn.

\`\`\`text
d367adee482fc39f6e62646b290c93de3ef20300bacd49db7e37a6452e873cc8  work/full-four/full-training/prefix.pt
2c662ca56465bec711297eba451e079a2ea7894ad5dfa9274940f515f22190e8  work/full-four/full-training/lora/adapter_model.safetensors
c4f99cf2889a341585293ac2a172063884bb843bba4262f8f456b8e244a581da  work/full-four/video-only/prefix.pt
37d93258600914d6fe73577af2c0b71eef2e5e84d3a74afe625e43fc4b160c0a  work/full-four/video-only/lora/adapter_model.safetensors
c6c61e74c905ac3a15f209c421dddf59444e2b28a10f25e8012a3d222e67c6e1  work/ollama-models/manifests/registry.ollama.ai/library/gemma4/12b
30a7056b89d125e5c5e0de2ffb130451840d92c0dab8243ae410c5db16598fc9  work/ollama-models/manifests/hf.co/mradermacher/PsyLLM-1.7B-GGUF/Q4_K_M
63f145db45f1a78e2db956654747887ae58064cdc68d8d32bc10e37518586071  work/ollama-models/manifests/hf.co/mradermacher/MINT-empathy-Qwen3-1.7B-GGUF/Q4_K_M
\`\`\`
