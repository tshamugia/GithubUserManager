import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { RoutersLib } from './Routes';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <FavoritesProvider>
          <main>
            <RoutersLib />
          </main>
        </FavoritesProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
