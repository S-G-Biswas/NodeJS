import './App.css';
import { Router, Route, Link, Switch } from 'react-router-dom';
import Search from './components/Search';
import Favorites from './components/Favorites';

function App() {
  return (
    <>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>

    </>
  );
}

export default App;
