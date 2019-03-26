import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Games from './components/Games';
import Game from './components/Game';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/games" component={Games} />
        <Route path="/games/:id" component={Game} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
