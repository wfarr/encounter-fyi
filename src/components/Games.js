import React from 'react';

import GameLi from './Game';

{
  /* TODO: Make this passed in or managed somewhere else, maybe? */
}

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.nextId = 4;
    this.state.games = [
      { id: 1, name: "Storm King's Thunder" },
      { id: 2, name: 'Waterdeep: Dragon Heist' },
      { id: 3, name: 'Critical Roll' }
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
        <ul>
          {this.state.games.map(game => (
            <GameLi key={game.id} name={game.name} />
          ))}
        </ul>

        <GameForm createHandler={this.createGame} />
      </div>
    );
  }
}

class GameLi extends React.Component {
  render() {
    return <li>{this.props.name}</li>;
  }
}

export default Games;
