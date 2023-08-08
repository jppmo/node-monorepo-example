// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import SetEmail from './components/SetEmail';
import SetNewPassword from './components/SetNewPassword';
import YourPassword from './components/YourPassword';
import SetOneTimePassword from './components/SetOneTimePassword';
import styles from './navbar.module.scss';

export function App() {
  return (
    <div>
      <nav className={styles.navbar}>
            <Link className={styles.navbarLink} to="/">Back to enter email</Link>
      </nav>
      <Routes>
        <Route path="/" Component={SetEmail} />
        <Route path="/new-password" Component={SetNewPassword} />
        <Route path="/your-password" Component={YourPassword} />
        <Route path="/one-time-password" Component={SetOneTimePassword} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
