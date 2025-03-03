# Polygon Searcher App

A React application that allows users to enter personal information and interact with a map to create, edit, and delete polygons.

## Features

- User registration form with validation
- Two-route navigation system
- OpenLayers map integration with polygon drawing capabilities
- Responsive design using Tailwind CSS
- User data persistence between routes

## Technologies Used

- React 18
- Vite (fast build tool)
- React Router for navigation
- OpenLayers for mapping functionality
- Tailwind CSS for styling
- Context API for state management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

1. Clone this repository
```bash
git clone <https://github.com/SahilSuman1011/Polygon-searcher-main>
cd polygon-searcher-main
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to view the application
```
http://localhost:8080
```

## Project Structure

```
map-polygon-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   ├── MapView.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   └── TransitionContainer.tsx
│   │   ├── context/
│   │   │   └── UserContext.tsx
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx
│   │   │   ├── use-toast.ts
|   |   |-- lib/
|   |   |   |-- utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Map.tsx
│   │   ├── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md

```

## Features in Detail

### Route 1: Search Form

- Collects user's first name and mobile number
- Performs validation:
  - First name must be provided
  - Mobile number must be a valid 10-digit number
- Stores user data in context for access across routes

### Route 2: Map Page

- Displays user's name in the header
- Provides a full-screen map with polygon drawing tools
- Toolbar with multiple interaction modes:
  - **View**: Navigate around the map and view existing polygons
  - **Draw**: Create new polygons by clicking points on the map
  - **Edit**: Modify existing polygons by dragging points
  - **Delete**: Remove polygons by selecting them

### Data Persistence

- User data is stored in React Context
- Map page is protected and redirects to the search form if user data is missing

## Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Customization

### Tailwind CSS Configuration

The Tailwind configuration can be customized in `tailwind.config.js`. For example, you can modify colors, spacing, and other design tokens:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here
        primary: '#3b82f6',
      },
    },
  },
  plugins: [],
}
```

### OpenLayers Configuration

The map configuration can be adjusted in the `MapComponent.jsx` file. You can modify:

- Initial map center and zoom level
- Base map layer (currently using OpenStreetMap)
- Polygon styling (colors, line width, etc.)
- Additional map controls and interactions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
