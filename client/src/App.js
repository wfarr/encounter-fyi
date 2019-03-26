import React from 'react';
import { Route, Link } from 'react-router-dom';

import Games from './components/Games';
import Game from './components/Game';

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

      <Route exact path="/" component={Home} />
      <Route exact path="/games" component={Games} />
      <Route path="/games/:id" component={Game} />
      <Route component={NotFound} />
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
