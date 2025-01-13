# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [6.2.0] - 2025-01-13

### Added

- Added settings that allow you to disable specific automations

### Changed

- Restructured data layout for better support of the new settings

### Fixed

- Fixed a minor problem that prevented a target from rolling their save automatically

## [6.1.6] - 2025-01-13

### Added

- Persistent Damage
- Persistent Healing

## [6.1.5] - 2025-01-13

### Added

- Daze
- Guidance
- Light
- Stabilize

### Changed

- Reworked how conditions are set

## [6.1.4] - 2025-01-12

### Fixed

- Grapple

## [6.1.3] - 2025-01-11

### Changed

- Minor internal changes to how messages are processed

### Removed

- Support for Dice So Nice! has been removed due to some issues with how it processes chat messages

## [6.1.2] - 2025-01-11

### Added

- Assassin Vine Wine
- Blood Booster
- Bomber's Eye Elixir
- Bravo's Brew
- Chromatic Jellyfish Oil
- Darkvision Elixir
- Egg Cream Fizz
- Fury Cocktail
- Gecko Potion
- Insight Coffee
- Merciful Balm
- Potency Crystal
- Potion of Emergency Escape
- Predator's Claw
- Sea Touch Elixir
- Shielding Salve
- Shining Ammunition
- Soothing Toddy
- Soothing Tonic
- Spiderfoot Brew
- Stone Body Mutagen
- Stone Fist Elixir
- Viperous Elixir

## [6.1.1] - 2025-01-11

### Added

- Bestial Mutagen
- Cheetah's Elixir
- Choker-Arm Mutagen
- Cognitive Mutagen
- Deadweight Mutagen
- Drakeheart Mutagen
- Eagle Eye Elixir
- Energy Mutagen
- Juggernaut Mutagen
- Numbing Tonic
- Prey Mutagen
- Quicksilver Mutagen
- Sanguine Mutagen
- Serene Mutagen
- Silvertongue Mutagen
- Skeptic's Elixir
- Theatrical Mutagen
- War Blood Mutagen

## [6.1.0] - 2025-01-10

### Added

- Tumble Behind
- Mistform Elixir
- Elixir of Life
- Antidote
- Antiplague

### Changed

- Improved Dice So Nice! support
- Moved all custom effects into a Compendium

## [6.0.4] - 2025-01-09

### Changed

- Added Demoralize Immunity

## [6.0.3] - 2025-01-08

### Added

- Basic support for Dice So Nice!
  - This is reliant on whoever is rolling to have 3D dice enabled, if they have it disabled than it will start processing their automations while it's still rolling on everyone else's screen.
- Bon Mot (Critical Success, Success, Critical Failure)
- Demoralize (Critical Success, Success)
- Stunning Blows (Failure, Critical Failure)

### Changed

- Disarm/Feint effect icons now match the system's icon for those actions.

## [6.0.2] - 2025-01-07

### Added

- Disarm (Success, Critical Failure)
- Feint (Critical Success, Success, Critical Failure)
  - Please note that for a successful feint the effect lasts until the end of your current turn, you will have to manually remove the effect after your next melee attack.

### Changed

- Made sure any updates or rolls are done from the primary user of an actor, if there are multiple users or no primary user than make sure it's done by the active GM.

## [6.0.1] - 2025-01-07

### Added

- Grapple (Critical Success, Success, Failure)
- Trip (Critical Success, Success, Failure)

## [6.0.0] - 2025-01-06

### Added

- Basic Critical Specialization Support for Bow, Brawling, Firearm, Flail, Hammer, Sling, Spear, and Sword
- Auto Self-Applied Effects (This is disabled if PF2e Toolbelt is doing this as well)
- Swashbuckler Panache

[Unreleased]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.2.0...HEAD
[6.2.0]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.6...v6.2.0
[6.1.6]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.5...v6.1.6
[6.1.5]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.4...v6.1.5
[6.1.4]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.3...v6.1.4
[6.1.3]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.2...v6.1.3
[6.1.2]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.1...v6.1.2
[6.1.1]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.1.0...v6.1.1
[6.1.0]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.4...v6.1.0
[6.0.4]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.3...v6.0.4
[6.0.3]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.2...v6.0.3
[6.0.2]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.1...v6.0.2
[6.0.1]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/7H3LaughingMan/pf2e-assistant/releases/tag/v6.0.0
