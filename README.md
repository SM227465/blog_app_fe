Here’s your complete `README.md` file with your original content and the added section on how to run a Vite + React + TypeScript app locally:

---

````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

---

## Running the App Locally

Follow these steps to set up and run the project locally:

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. **Install Dependencies**

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) installed.

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. **Run the Development Server**

```bash
npm run dev
```

Or with Yarn:

```bash
yarn dev
```

This will start the Vite development server and you can access the app in your browser at:

```
http://localhost:5173/
```

### 4. **Build for Production**

To create a production-ready build:

```bash
npm run build
```

Or with Yarn:

```bash
yarn build
```

### 5. **Preview the Production Build Locally**

```bash
npm run preview
```

Or:

```bash
yarn preview
```

This serves the production build locally for testing.

---
