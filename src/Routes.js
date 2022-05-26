import { Route, Routes } from 'react-router-dom';
import { ROUTES_CONFIG } from './config/routes';

import React from 'react';

export function RoutersLib() {
  return (
    <Routes>
      {ROUTES_CONFIG.map((route) => {
        const Guard = route.guard;
        const Page = route.page;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Guard>
                <Page />
              </Guard>
            }
          />
        );
      })}
    </Routes>
  );
}
