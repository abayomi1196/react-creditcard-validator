## 📖 Prerequisites

The project relies on Node.js (Node 14.0.0 or later version). It's also recommended to use Node Version Manager to ensure you're using the right Node.js version.

## 🛠 Installation

To get started, clone the project and install the dependencies from your terminal:

```bash
git clone https://github.com/abayomi1196/react-creditcard-input.git
cd react-creditcard-input
npm install
```

## Developement

### 🎬 Start app

To run the app on a development server with hot module reloading:

`npm start`

### ✅ Tests

The project uses Jest and Testing Library for testing.

You should run tests before you commit, or at least before you open a pull request. Pull requests need to pass all checks to be reviewed, so doing it beforehand will save you time.

`npm test`

### 🔭 Linting

The project uses [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting.

You should format your code before you commit, or at least before you open a pull request.

`npm run format`

## Conventions

### 🔌 Pull requests

Pull requests should target `main`. As with commit messages, pull request titles should follow the [conventional commits convention](https://www.conventionalcommits.org/)

## Commit messages

The project follows the conventional commits approach to standardize commit messages, commit messages should be formatted using the following scheme:

`type(optional scope): subject`

Some available types:

- `build:` changes affecting the build system or external dependencies
- `ci:` changes to CI configuration files and scripts
- `docs:` documentation changes
- `feat:` a new feature
- `fix:` a bug fix
- `perf:` changes improving performance
- `refactor:` changes that neither fixes a bug nor adds a feature
- `test:` adding or fixing tests
