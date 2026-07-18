# Contributing to Remallow

Thank you for your interest in contributing to Remallow! This guide will help you get started.

## Prerequisites

- Node.js >= 14.0.0
- npm, yarn, or pnpm
- Git

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/remallow.git
   cd remallow
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development:
   ```bash
   # Terminal 1: Start the server
   npm run server

   # Terminal 2: Start the UI dev server
   npm run ui
   ```

## Project Architecture

```
remallow/
  server/             # Express.js backend
    bin/index.js      # Entry point, starts server + opens browser
    routes.js         # API endpoints (install, uninstall, upgrade, search)
    static-files.js   # Serves built UI assets
    utils/helper.js   # Input validation, command mapping
  ui/                 # React frontend
    index.js          # Entry point
    src/
      components/     # React components (List, Packages, Manager, etc.)
      containers/     # Layout wrapper
      contexts/       # React contexts (Toast notifications)
      styles/         # CSS design system (theme, animations, components)
      utils/          # API client, custom hooks
  webpack.*.config.js # Build configuration
```

## How It Works

1. User runs `remallow` in a project directory
2. Express server starts and reads the project's `package.json`
3. Server opens the default browser pointing to the local server
4. React UI communicates with the Express backend via REST API
5. Backend executes npm/yarn/pnpm commands using `cross-spawn` (cross-platform)

## Code Style

- Use functional React components with hooks
- CSS custom properties for theming (see `ui/src/styles/theme.css`)
- No inline styles except for dynamic values
- Use `cross-spawn` instead of `child_process.exec` for cross-platform support

## Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test by running `npm run build` and testing the built app
4. Commit with a descriptive message
5. Push and create a Pull Request

## Reporting Issues

Please use the [GitHub issue templates](https://github.com/yokesharun/remallow/issues/new/choose) to report bugs or request features.
