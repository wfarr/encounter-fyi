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

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" className="col-md-4">
                Name
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.games.map(game => gameTableRow(game, this.deleteGame))}
          </tbody>
        </table>

        <hr />

        <h4>Create a Game</h4>
        <GameForm createHandler={this.createGame} />
      </div>
    );
  }
}

function gameTableRow(game, handleDelete) {
  return (
    <tr key={game.id}>
      <td>
        <Link to={{ pathname: `/games/${game.id}`, state: { game: game } }}>
          {game.id}
        </Link>
      </td>

      <td>
        <Link to={{ pathname: `/games/${game.id}`, state: { game: game } }}>
          {game.name}
        </Link>
      </td>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(game.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Games;
