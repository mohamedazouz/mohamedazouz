# Versioning & Commit Rules

The user's global rules in `~/.claude/rules/versioning.md` always apply: ask before every
commit, push or PR; GPG-signed commits with no bypass; conventional commit messages; and
confirm GitHub shows "Verified" after each push. This file adds what is specific to this repo.

## This repository is PUBLIC

- Commit email must be the GitHub no-reply address:
  `5054534+mohamedazouz@users.noreply.github.com`. Check `git config user.email` before
  committing; never commit with a personal email here.
- All changes reach `main` through a pull request. Never push directly to `main`.
- After pushing, run
  `gh api repos/mohamedazouz/mohamedazouz/commits/<sha> --jq .commit.verification`
  and do not ask for a merge unless `verified` is `true`.

## Signed commits

- Every commit and tag is GPG-signed (`git commit -S`; note `-s` is only sign-off).
- If signing fails, stop and tell the user. Never use `--no-gpg-sign` or
  `-c commit.gpgsign=false`.

## Commit messages

- Conventional commits with an optional scope: `feat(seo): …`, `docs(about): …`,
  `ci: …`, `chore(deps): …`. Subject under 72 characters, imperative mood.

## Dependencies

- Bun only. `bunfig.toml` enforces a 30-day `minimumReleaseAge`; never lower or bypass it.
- CI installs with `bun install --frozen-lockfile`.
- Pin GitHub Actions to full commit SHAs with the version as a comment.
