import GuestGuard from '../components/guards/GuestGuard';
import AuthGuard from '../components/guards/AuthGuard';
import {
  Dashboard,
  Favorite,
  Login,
  NotFound,
  Registration,
  Search,
  UserPage,
} from '../pages/';

const ROUTES = {
  SIGNIN: '/',
  SIGNUP: '/signup/',
  DASHBOARD: '/dashboard/',
  USER: '/user/:id',
  SEARCH: '/search/',
  FAVORITE: '/favorites/',
};

const ROUTES_CONFIG = [
  {
    path: ROUTES.SIGNUP,
    guard: GuestGuard,
    page: Registration,
  },
  {
    path: ROUTES.SIGNIN,
    guard: GuestGuard,
    page: Login,
  },
  {
    path: ROUTES.DASHBOARD,
    guard: AuthGuard,
    page: Dashboard,
  },
  {
    path: ROUTES.USER,
    guard: AuthGuard,
    page: UserPage,
  },
  {
    path: ROUTES.SEARCH,
    guard: AuthGuard,
    page: Search,
  },
  {
    path: ROUTES.FAVORITE,
    guard: AuthGuard,
    page: Favorite,
  },
  {
    path: '*',
    guard: AuthGuard,
    page: NotFound,
  },
];

export default ROUTES;
export { ROUTES_CONFIG };
