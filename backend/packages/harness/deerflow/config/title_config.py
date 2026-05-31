"""Configuration for automatic thread title generation."""

from pydantic import BaseModel, Field


class TitleConfig(BaseModel):
    """Configuration for automatic thread title generation."""

    enabled: bool = Field(
        default=True,
        description="Whether to enable automatic title generation",
    )
    max_words: int = Field(
        default=6,
        ge=1,
        le=20,
        description="Maximum number of words in the generated title",
    )
    max_chars: int = Field(
        default=60,
        ge=10,
        le=200,
        description="Maximum number of characters in the generated title",
    )
    model_name: str | None = Field(
        default=None,
        description="Model name to use for title generation (None = use default model)",
    )
    prompt_template: str = Field(
        default=(
            "Generate a concise title (max {max_words} words, max {max_chars} characters) for this conversation.\n"
            "User: {user_msg}\n"
            "Assistant: {assistant_msg}\n\n"
            "If the conversation is about AI tool evaluation, tool comparison, pilot planning, AI operations tool selection, workflow automation, Agent platforms, knowledge bases, or tools such as Dify, Coze, FastGPT, Codex, Claude Code, n8n, or Make, make the title look like an evaluation record.\n"
            "Prefer these patterns when applicable:\n"
            "- Single-tool quick evaluation: Tool｜快速测评｜ScenarioKeyword\n"
            "- Tool comparison: ToolA vs ToolB｜工具对比\n"
            "- Knowledge-base tool comparison: ToolA vs ToolB｜知识库工具对比\n"
            "- Pilot plan: Tool｜试点方案｜TeamOrScenario\n"
            "- Coding or automation tool: Tool｜内容自动化测评 or Tool｜AI 编程工具测评\n"
            "Prioritize tool name, evaluation type, and scenario keyword. If the tool name is unclear, use ScenarioKeyword｜EvaluationType, for example AI工具选型｜试点方案.\n"
            "Do not force the AI-tool title format onto normal conversations; for normal conversations, generate a natural short title.\n"
            "Keep it short for a sidebar. Avoid long titles like 关于……的分析报告. Do not use punctuation at the end. Do not output Markdown, quotes, or explanation.\n\n"
            "Return ONLY the title."
        ),
        description="Prompt template for title generation",
    )


# Global configuration instance
_title_config: TitleConfig = TitleConfig()


def get_title_config() -> TitleConfig:
    """Get the current title configuration."""
    return _title_config


def set_title_config(config: TitleConfig) -> None:
    """Set the title configuration."""
    global _title_config
    _title_config = config


def load_title_config_from_dict(config_dict: dict) -> None:
    """Load title configuration from a dictionary."""
    global _title_config
    _title_config = TitleConfig(**config_dict)


def reset_title_config() -> None:
    """Restore the title configuration to its pristine ``TitleConfig()`` default.

    Public API so that tests do not have to reach into the private
    ``_title_config`` module attribute. ``AppConfig.from_file()`` calls
    :func:`load_title_config_from_dict`, which permanently mutates the
    singleton; tests that need a clean slate between cases should call
    this between tests.
    """
    global _title_config
    _title_config = TitleConfig()
