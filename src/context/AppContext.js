import { createContext, useEffect, useState } from 'react';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const AppContext = createContext({ users: [] });

function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.github.com/search/users?q=followers:%3E=1000&page=${page}&per_page=20`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + `${GITHUB_TOKEN}`,
        },
      }
    )
      .then((responce) => {
        if (responce.ok) {
          return responce.json();
        }
        throw new Error('Something went wrong!!!');
      })
      .then((data) => setUsers((prev) => [...prev, data.items]))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <AppContext.Provider
      value={{
        users,
        loading,
        favorites,
        setFavorites,
        setLoading,
        setError,
        error,
        setPage,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
