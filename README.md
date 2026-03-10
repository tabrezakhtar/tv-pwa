# TV Show Search PWA

A Progressive Web App for searching and exploring TV shows, built with React and powered by the TVMaze API.

## Features

- 🔍 **Fast Search** - Debounced search with instant results
- 📱 **Progressive Web App** - Works offline and can be installed on your device
- 💾 **Offline Storage** - All searches cached locally using IndexedDB
- 🎬 **Detailed Information** - View show details including cast, seasons, ratings, and more
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Fast Performance** - Powered by Vite for lightning-fast development and builds

## Technology Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible component library
- **SWR** - React hooks for data fetching with caching
- **IndexedDB (idb)** - Client-side database for offline storage
- **vite-plugin-pwa** - PWA support with service workers
- **TVMaze API** - TV show data source

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tabrezakhtar/tv-pwa.git
   cd tv-pwa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## License

MIT

## Credits

- TV show data provided by [TVMaze API](https://www.tvmaze.com/)
