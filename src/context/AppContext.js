import { createContext, useEffect, useState } from 'react';
import { GithubTopUsers, GithubUserDetailInfo } from '../http/http';

const AppContext = createContext([]);

function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    GithubTopUsers(page)
      .then((data) => setUsers(data.items))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    users.map((user) =>
      GithubUserDetailInfo(user)
        .then((data) => setUserDetail((prev) => [...prev, data]))
        .catch((error) => setError(error.message))
    );
  }, [users]);

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
        userDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
