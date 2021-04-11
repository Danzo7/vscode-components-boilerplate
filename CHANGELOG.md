## [1.0.0] - 2021-04-10
### Added
- Add variants to the config file to be able to use more than one variable.
- Add the ability to have more than one template.
- Add type definition for config file with type guard.
- implement a new VSCode Multi step inputs to collect data (selectedTemplate, variants).
- - Add ``isWrapped`` option to plugin settings.
- improve Error handling and error messages.
- cleanUp old code and improve reliability.
- Docs with gif examples now!.
### Changed  
- remove predefined configs(plugin configs are not an option anymore).
- remove old plugin options for predefined boilerplates.
- change config file name to `boilerplates.config.js`.
- change config file structure to hold more than one boilerplate template.
- change context menu title from `Boil a new component..` to `Generate new component...` .
### Fixed
- Fix a bug when windows config file path is corrupted due to windows file system.
- Fix a bug when config file is not of type `boilerplateConfig[]` but its passes to the plugin causing it to crash.
- Fix Error message when config file is not a valid JS file.
- Improve error handling and bugs checking.
## [0.1.2] - 2021-02-16
### Added
- add react TS config file example.
- write docs.
- use `components-boilerplate.js` as a name for config file.
### Fixed
- Improve walkthrough boilerplate template.
- Fix JS file not found when no is workplace selected.
- Fix predefined config template. 
## [0.1.1] - 2021-02-21
### Added
- improve config file structure.
- implement generate components from a giving config JS file.
### Fixed
- Fix bug when config file not found use plugin config.

## [0.1.0] - 2021-02-04
### Added
- Rename to components boilerplate.
- implement generate components from plugin configs.
- improve files generator.
- Add Generate files from a giving JS config file(only test).
- 
## [Unreleased] -2021-01-26
- First release.
- implement file generation core.
- barebones.
