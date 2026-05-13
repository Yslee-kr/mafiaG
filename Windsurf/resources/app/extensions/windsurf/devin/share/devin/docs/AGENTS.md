@README.md

# Public Documentation

This directory contains **public, user-facing documentation** for the Devin CLI.

## Guidelines

- Content here is published externally and must not contain anything secret or confidential.
- Do not include internal code documentation here; that belongs in rustdoc.
- Keep documentation focused on end-user usage, setup, and troubleshooting.
- On stable publish, the contents of this directory are automatically committed to the external docs repository.

## Updating Docs for New Features

When you implement a new user-facing feature, change existing behavior, or add/modify CLI commands, flags, or configuration options, you **must** update the relevant documentation in this directory as part of the same change. This includes:

- New commands or subcommands → update `reference/commands.mdx`
- New or changed configuration options → update `reference/configuration/`
- New extensibility features (MCP, skills, rules) → update `extensibility/`
- New permission or auth flows → update `reference/permissions.mdx` or `enterprise/`
- General usage changes → update `essential-commands.mdx` or other relevant pages
- If the feature introduces an entirely new concept, create a new page and add it to `docs.json` navigation

Do not defer documentation to a follow-up — it should ship with the feature.
