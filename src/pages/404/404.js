import { Header } from '../../components/header/Header';
import './404.css';

export function NotFound() {
  return (
    <>
      <Header />
      <div className="notfound">
        <h1>Page Not Found</h1>;
      </div>
    </>
  );
}
