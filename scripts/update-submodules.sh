#!/bin/bash

# Script to update all submodules to their main branches

echo "Updating submodules to track main branches..."

# Update .gitmodules to ensure all submodules track main branch
git config -f .gitmodules submodule.packages/chrome.branch main
git config -f .gitmodules submodule.packages/backend.branch main

# Set branch for each submodule
git submodule set-branch --branch main -- packages/chrome
git submodule set-branch --branch main -- packages/backend

# Update submodules to latest on main branch
git submodule update --remote --merge

echo "Checking submodule statuses..."
git submodule status

echo "Done! All submodules updated to track main branch."
echo "Remember to commit and push the changes if needed." 