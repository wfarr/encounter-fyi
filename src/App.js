import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Thing from './components/Thing';
import Frame from './components/Frame';

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
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/thing">Thing</Link>
          </li>
          <li>
            <Link to="/frame">Frame</Link>
          </li>
            
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/topics" component={Topics} />
        { /* New component/paths I added */ }
        <Route path="/thing" component={Thing} />
        <Route path="/frame" component={Frame} />
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

function Games() {
  const gameNames = ["Storm King's Thunder",
    "Waterdeep: Dragon Heist",
    "Critical Roll"
  ];

  const games = gameNames.map((name) => <Game name={name}/>);

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games}
      </ul>
    </div>
  );
}

function Game(props) {
  return <li>{props.name}</li>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default App;
