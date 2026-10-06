import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { dismissSplash } from './lib/splash'

createRoot(document.getElementById("root")!).render(<App />);

dismissSplash();
