# VSCode Rails easy migration

This extension provides some keybindings for running Rails migration in build-in VSCode terminal.

![screenshot](screenshot.gif)

## Why we should use it?
Have you ever wanted to rollback and re-migrate a specific migration version? Are you bored with coping the version file?

## Features

I shipped some keybindings help you easy to run migration on VSCode integrated terminal.

This extension mission is checking your current opening Rails migration file and run the migration in a nutshell.

- Running migration on whole project and you don't give a shit about what file you're opening: ⌘+m ⌘+m.
- Up your current opening migration file: ⌘+m ⌘+u.
- Down it by using: ⌘+m ⌘+d.
- Re-run the opening by: ⌘+m ⌘+r (Really useful when your table is not stable yet).

**To help you easy to remember the keybindings, the ⌘+m stands for `migrate`.**
