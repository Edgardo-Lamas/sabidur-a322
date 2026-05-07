import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { inject } from '@vercel/analytics'
import './index.css'
import App from './App.jsx'

inject()

// StrictMode removed: react-leaflet and custom imperative Leaflet hooks
// (useMarkerCluster, useNarrativeMap, useStoryMode) are not designed for
// StrictMode's double-invocation of effects in development.
// Production builds are unaffected — they never double-invoke effects.
createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
)
