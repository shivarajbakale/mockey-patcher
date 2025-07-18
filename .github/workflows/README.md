# GitHub Workflows

This directory contains GitHub Action workflows for automating various tasks in the repository.

## Build Chrome Extension Workflow

The `build-chrome-extension.yml` workflow automatically builds and releases the Chrome extension whenever changes are pushed to the main branch that affect the Chrome extension code.

### What it does:

1. **Version Bumping**: Automatically increments the patch version of the Chrome extension (e.g., 0.0.1 → 0.0.2).
2. **Building**: Builds the Chrome extension using the `yarn build:ship` command.
3. **Artifact Creation**: Creates a zip file of the extension named `mockey-patcher-v{version}.zip`.
4. **GitHub Release**: Creates a new GitHub release with the version tag and attaches the zip file.
5. **Version Control**: Commits the version change back to the repository.

### Triggering the workflow:

The workflow runs automatically when:
- Code is pushed to the `main` or `master` branch
- Changes are made to files in the `packages/chrome/` directory
- Changes are made to the workflow file itself

### Outputs:

- A new commit with the updated version in `packages/chrome/package.json`
- A new GitHub release with the tag `v{version}` (e.g., `v0.0.2`)
- A downloadable zip file of the Chrome extension attached to the release

### Permissions:

The workflow requires `write` permissions to the repository contents to:
- Push the version bump commit
- Create a new release

### Notes:

- Only the patch version is incremented automatically (the third number in the version)
- For major or minor version updates, you'll need to update the version manually 