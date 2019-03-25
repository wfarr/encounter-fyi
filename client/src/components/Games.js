import React from 'react'

import Game from './Game'

import axios from 'axios';

{/* TODO: Make this passed in or managed somewhere else, maybe? */}

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.nextId = 4;
    this.state.games = [];

    this.createGame = this.createGame.bind(this);

  }

  componentDidMount() {
    axios.get("/api/v1/games.json")
    .then(response => {
      console.log(response)
      this.setState({
          games: response.data
      })
    })
    .catch(error => console.log(error))
  }

  createGame(name) {
    this.setState({
      games: [...this.state.games, {id: this.state.nextId, name: name}],
      nextId: this.state.nextId + 1
    });
  }

  render() {
    return (
      <div>
        <h2>Games</h2>
        <ul>
          { this.state.games.map((game) => <Game key={game.id} name={game.name}/>) }
        </ul>

        <GameForm createHandler={this.createGame} />
      </div>
    );
  }
}

class GameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.createHandler = props.createHandler;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.createHandler(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit"></input>
      </form>
    );
  }
}

export default Games