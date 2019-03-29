import React from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.recentCharactersHandler = this.recentCharactersHandler.bind(this);
    this.recentEncountersHandler = this.recentEncountersHandler.bind(this);
    this.recentGamesHandler = this.recentGamesHandler.bind(this);

    this.state = {
      loaded: false,
      home: {
        recent_characters: [],
        recent_encounters: [],
        recent_games: []
      }
    };
  }

  componentDidMount() {
    axios
      .get('/api/v1/home')
      .then(response => {
        console.log('before state', this.state);
        this.setState({
          home: response.data
        });
        console.log('after state', this.state);
      })
      .catch(error => console.log(error));
  }

  recentEncountersHandler() {
    const encounterTableRow = encounter => {
      return (
        <tr>
          <td>
            <Link to={`/encounters/${encounter.id}`}>{encounter.name}</Link>
          </td>
          <td>
            <TimeAgo date={encounter.created_at} />
          </td>
        </tr>
      );
    };

    return (
      <table className="table">
        <tbody>
          {this.state.home.recent_encounters.map(encounter =>
            encounterTableRow(encounter)
          )}
        </tbody>
      </table>
    );
  }

  recentCharactersHandler() {
    const characterTableRow = character => {
      return (
        <tr key={`character-${character.id}`}>
          <td>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </td>
          <td>
            <TimeAgo date={character.created_at} />
          </td>
        </tr>
      );
    };

    return (
      <table className="table">
        <tbody>
          {this.state.home.recent_characters.map(character =>
            characterTableRow(character)
          )}
        </tbody>
      </table>
    );
  }

  recentGamesHandler() {
    const gameTableRow = game => {
      return (
        <tr key={`game-${game.id}`}>
          <td>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </td>
          <td>
            <TimeAgo date={game.created_at} />
          </td>
        </tr>
      );
    };

    return (
      <table className="table">
        <tbody>
          {this.state.home.recent_games.map(game => gameTableRow(game))}
        </tbody>
      </table>
    );
  }

  card(title, contentHandler, link, linkName) {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">{contentHandler()}</p>
          <Link className="btn btn-primary" to={link}>
            {linkName}
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <PageTitle title="Home" />

        <div class="row">
          <div class="col-sm-4">
            {this.card(
              'Recent Games',
              this.recentGamesHandler,
              '/games',
              'More Games...'
            )}
          </div>

          <div class="col-sm-4">
            {this.card(
              'Recent Encounters',
              this.recentEncountersHandler,
              '/encounters',
              'More Encounters...'
            )}
          </div>

          <div class="col-sm-4">
            {this.card(
              'Recent Characters',
              this.recentCharactersHandler,
              '/characters',
              'More Characters...'
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
