import './config/i18n.config.ts';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MainProvider } from './components/MainProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MainProvider>
    <App />
  </MainProvider>,
);
