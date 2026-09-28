"""
Sample Agent Script using Google Antigravity Python SDK
Repository: https://github.com/google-antigravity/antigravity-sdk-python

Features demonstrated:
1. Agent initialization via LocalAgentConfig
2. Custom Python Tool registration (inspection of project files)
3. Streaming response tokens in real-time
4. Streaming agent internal reasoning / thought process
5. Interactive terminal chat loop (--interactive)
"""

import argparse
import asyncio
import os
import sys
from pathlib import Path
from typing import Optional

# Import Antigravity SDK components
try:
    from google.antigravity import (
        Agent,
        LocalAgentConfig,
        CapabilitiesConfig,
    )
    from google.antigravity.utils.interactive import run_interactive_loop
except ImportError as err:
    print(f"[Error] Failed to import google-antigravity: {err}")
    print("Please install the SDK via: pip install google-antigravity")
    sys.exit(1)


def load_env_file(filepath: str = ".env") -> None:
    """Simple parser to load .env file if present without extra dependencies."""
    env_path = Path(filepath)
    if not env_path.is_file():
        return
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key = key.strip()
            val = val.strip().strip("'\"")
            if key and key not in os.environ:
                os.environ[key] = val


# Define a custom tool the agent can invoke
def get_portfolio_summary() -> str:
    """Returns a summary of the files and structure in the current portfolio project workspace.
    
    Returns:
        A formatted string listing the main files and directories.
    """
    cwd = Path.cwd()
    entries = []
    for item in sorted(cwd.iterdir()):
        if item.name.startswith("."):
            continue
        kind = "Directory" if item.is_dir() else f"File ({item.stat().st_size} bytes)"
        entries.append(f"- {item.name} [{kind}]")
    
    return "Project workspace structure:\n" + "\n".join(entries)


async def run_oneshot(
    prompt: str,
    api_key: Optional[str] = None,
    show_thoughts: bool = False,
) -> None:
    """Run a single prompt and stream response tokens."""
    config = LocalAgentConfig(
        system_instructions=(
            "You are an intelligent development assistant integrated with this portfolio project. "
            "You have access to tools to inspect project structure. Be concise, friendly, and helpful."
        ),
        capabilities=CapabilitiesConfig(),
        tools=[get_portfolio_summary],
        api_key=api_key,
    )

    print(f"\n[Agent Session Started]")
    print(f"Prompt: {prompt}\n" + "-" * 50)

    async with Agent(config) as agent:
        response = await agent.chat(prompt)

        # Optionally monitor thoughts / reasoning deltas
        if show_thoughts:
            async for thought in response.thoughts:
                print(f"\033[90m[Thinking] {thought}\033[0m")

        # Stream response tokens
        print("\033[36mResponse:\033[0m")
        async for token in response:
            sys.stdout.write(token)
            sys.stdout.flush()
        print("\n" + "-" * 50)


async def run_interactive(api_key: Optional[str] = None) -> None:
    """Launch an interactive conversation session in the terminal."""
    config = LocalAgentConfig(
        system_instructions="You are a helpful coding and portfolio assistant.",
        capabilities=CapabilitiesConfig(),
        tools=[get_portfolio_summary],
        api_key=api_key,
    )

    print("\n[Starting Interactive Session - Type 'exit' or press Ctrl+C to quit]\n")
    async with Agent(config) as agent:
        await run_interactive_loop(agent)


def main():
    parser = argparse.ArgumentParser(
        description="Google Antigravity Python SDK Starter Demo"
    )
    parser.add_argument(
        "-p", "--prompt",
        type=str,
        default="Briefly describe what this project contains using the get_portfolio_summary tool.",
        help="Prompt to send to the agent (default: inspect portfolio project structure)",
    )
    parser.add_argument(
        "-i", "--interactive",
        action="store_true",
        help="Launch an interactive chat session",
    )
    parser.add_argument(
        "--show-thoughts",
        action="store_true",
        help="Display the agent's internal reasoning and thought tokens",
    )
    parser.add_argument(
        "--api-key",
        type=str,
        default=None,
        help="Gemini API Key (can also be set via GEMINI_API_KEY environment variable or .env file)",
    )

    args = parser.parse_args()

    # Load local .env if available
    load_env_file()

    api_key = args.api_key or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("=" * 60)
        print("[\033[33mNotice\033[0m] No Gemini API key detected!")
        print("To run the agent against Google Gemini models, provide your API key:")
        print("  1. In PowerShell:   $env:GEMINI_API_KEY=\"your_api_key_here\"")
        print("  2. In .env file:    Create a .env file with GEMINI_API_KEY=your_key")
        print("  3. Via CLI flag:    python sample_agent.py --api-key your_key")
        print("\nYou can obtain a free API key at: https://aistudio.google.com/")
        print("=" * 60)
        sys.exit(1)

    try:
        if args.interactive:
            asyncio.run(run_interactive(api_key=api_key))
        else:
            asyncio.run(
                run_oneshot(
                    prompt=args.prompt,
                    api_key=api_key,
                    show_thoughts=args.show_thoughts,
                )
            )
    except KeyboardInterrupt:
        print("\nSession ended by user.")


if __name__ == "__main__":
    main()
