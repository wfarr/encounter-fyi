import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import PageTitle from './components/PageTitle';

import Games from './components/Games';
import Game from './components/Game';
import EncounterList from './components/EncounterList';
import Encounter from './components/Encounter';
import PersistentCharacterList from './components/PersistentCharacterList';
import PersistentCharacter from './components/PersistentCharacter';
import NotFound from './components/NotFound';

import './App.scss';

function App() {
  return (
    <div id="app">
      <TopBar />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <Main />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <Routes />
    </main>
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/games" component={Games} />
      <Route exact path="/encounters" component={EncounterList} />
      <Route
        exact
        path="/persistent_characters"
        component={PersistentCharacterList}
      />
      <Route path="/games/:game_id/encounters/:id" component={Encounter} />
      <Route path="/games/:id" component={Game} />
      <Route path="/encounters/:id" component={Encounter} />
      <Route
        path="/persistent_characters/:id"
        component={PersistentCharacter}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function TopBar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-sm-3 col-md-2 mr-0">
        encounter.fyi
      </Link>
    </nav>
  );
}

function SideBar() {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/persistent_characters" className="nav-link">
              Characters
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/games" className="nav-link">
              Games
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/encounters" className="nav-link">
              Encounters
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Home() {
  return <PageTitle title="Home" />;
}

export default App;
