# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Basic support for Dice So Nice!
  - This is reliant on whoever is rolling to have 3D dice enabled, if they have it disabled it can process automations on their end before the dice finishing rolling for other users.
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

[Unreleased]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.2...HEAD
[6.0.2]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.1...v6.0.2
[6.0.1]: https://github.com/7H3LaughingMan/pf2e-assistant/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/7H3LaughingMan/pf2e-assistant/releases/tag/v6.0.0
