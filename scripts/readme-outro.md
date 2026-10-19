## How these were made

Gavin Long wrote these with Claude Code while building production systems through
2026: an internal business development system on a real sales pipeline, a Slack-based
operations assistant, a sports analytics engine, several deployed web apps, and research
bots. Each rule started as a correction or a failure in that work and was written down so
the next session would not repeat it.

The agent authored the text at Gavin's direction. The published copies are scrubbed of
client and colleague details; in the rule groups the dates, numbers and failures are as
they happened. The playbook groups run on made-up sample data.

## Keeping it consistent

Every README in this repo is generated. Edit a `SKILL.md` or `catalog.json`, then run
`python scripts/build_readmes.py`; `--check` fails if any page is out of date.

## License

MIT. See `LICENSE`.
