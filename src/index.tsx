import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { APP_URLS } from './configs/urls.js';
import { Game } from './pages/Game.js';
import { Home } from './pages/Home.jsx';
import { Rules } from './pages/Rules.js';
import { Settings } from './pages/Settings.js';
import { NotFound } from './pages/_404.jsx';
import './style.css';

console.log(import.meta.env);
export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path={APP_URLS.ROOT} component={Home} />
        <Route path={APP_URLS.SETTINGS} component={Settings} />
        <Route path={APP_URLS.GAME} component={Game} />
        <Route path={APP_URLS.RULES} component={Rules} />

        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));
