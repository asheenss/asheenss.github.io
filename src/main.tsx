import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CelebrationProvider } from './components/animations/Celebration';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CelebrationProvider>
      <App />
    </CelebrationProvider>
  </StrictMode>,
);
