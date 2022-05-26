import { createContext, useEffect, useState } from 'react';

const FavoritesContext = createContext({ users: [] });

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const localFavorites = localStorage.getItem('favoriteUsers');
    return localFavorites ? JSON.parse(localFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteUsers', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext, FavoritesProvider };
