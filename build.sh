#!/bin/bash
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
npm install

# Install react-scripts globally
npm install -g react-scripts@5.0.1

# Run the build
CI=false DISABLE_ESLINT_PLUGIN=true npx --yes react-scripts build 