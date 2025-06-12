import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import type { AppState } from './types/app.types';
import { Toaster } from 'react-hot-toast';

function App() {
  const theme = useSelector((state: AppState) => state.theme);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <Header />
        <main className='main-content'>
          <div className='container'>
            <AppRoutes />
          </div>
        </main>
      </Router>

      <Toaster />
    </div>
  );
}

export default App;
