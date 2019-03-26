import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Games from './components/Games'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
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
          <Route path="/" component={Home} />
          <Route path="/games" component={Games} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
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
