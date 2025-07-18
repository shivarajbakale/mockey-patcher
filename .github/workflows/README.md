# GitHub Workflows

This directory contains GitHub Action workflows for automating various tasks in the repository.

## Build Chrome Extension Workflow

The `build-chrome-extension.yml` workflow automatically builds and releases the Chrome extension whenever changes are pushed to the main branch that affect the Chrome extension code.

### What it does:

1. **Version Detection**: Gets the current version from the Chrome extension's package.json file.
2. **Building**: Builds the Chrome extension using the `yarn build:ship` command.
3. **Artifact Creation**: Creates the following artifacts:
   - A zip file of the extension named `mockey-patcher-v{version}.zip`
   - Copies the `docker-compose.public.yml` file for easy access
4. **Release Management**: Checks if a release with the current version tag already exists:
   - If it exists, it deletes the old release
   - Creates a new GitHub release with the version tag
5. **Asset Attachment**: Attaches both the Chrome extension zip and docker-compose file to the release

### Triggering the workflow:

The workflow runs automatically when:
- Code is pushed to the `main` or `master` branch
- Changes are made to files in the `packages/chrome/` directory
- Changes are made to the workflow file itself

### Outputs:

- A GitHub release with the tag `v{version}` (e.g., `v0.0.1`)
- Downloadable assets attached to the release:
  - Chrome extension zip file: `mockey-patcher-v{version}.zip`
  - Docker compose file: `docker-compose.public.yml`

### Permissions:

The workflow requires `write` permissions to the repository contents to:
- Delete existing releases
- Create new releases
- Upload release assets

### Notes:

- The workflow uses the version specified in `packages/chrome/package.json`
- To update the version, manually change it in the package.json file
- The workflow will overwrite existing releases with the same version number 