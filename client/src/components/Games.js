import React from 'react';
import { Link } from 'react-router-dom';

import GameForm from './GameForm';

/* TODO: Make this passed in or managed somewhere else, maybe? */

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.nextId = 4;
    this.state.games = [
      { id: 1, name: "Storm King's Thunder" },
      { id: 2, name: 'Waterdeep: Dragon Heist' },
      { id: 3, name: 'Critical Role' }
    ];

    this.createGame = this.createGame.bind(this);
  }

  createGame(name) {
    this.setState({
      games: [...this.state.games, { id: this.state.nextId, name: name }],
      nextId: this.state.nextId + 1
    });
  }

  render() {
    return (
      <div>
        <h2>Games</h2>
        <ul>{this.state.games.map(game => gameLi(game))}</ul>

        <GameForm createHandler={this.createGame} />
      </div>
    );
  }
}

function gameLi(game) {
  return (
    <li key={game.id}>
      <Link to={{ pathname: `/games/${game.id}`, state: { game: game } }}>
        {game.name}
      </Link>
    </li>
  );
}

export default Games;
