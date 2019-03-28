import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from './PageTitle';

import GameForm from './GameForm';

import axios from 'axios';

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.games = [];

    this.createGame = this.createGame.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  refreshGames() {
    axios
      .get('/api/v1/games.json')
      .then(response => {
        console.log(response);
        this.setState({
          games: response.data
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.refreshGames();
  }

  createGame(name) {
    console.log(name);
    axios
      .post('/api/v1/games', { game: { name: name } })
      .then(response => {
        console.log(response);

        const game = response.data;
        this.setState({
          games: [...this.state.games, game]
        });
      })
      .catch(error => console.log(error));
  }

  deleteGame(gameId) {
    axios
      .delete(`/api/v1/games/${gameId}`)
      .then(response => {
        console.log(response);
        this.refreshGames();
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <PageTitle title="Games" />
        <ul>{this.state.games.map(game => gameLi(game, this.deleteGame))}</ul>

        <GameForm createHandler={this.createGame} />
      </div>
    );
  }
}

function gameLi(game, handleDelete) {
  return (
    <li key={game.id}>
      <Link to={{ pathname: `/games/${game.id}`, state: { game: game } }}>
        {game.name} -- {game.encounters_count} encounters
      </Link>
      <button onClick={() => handleDelete(game.id)}>Delete</button>
    </li>
  );
}

export default Games;
