import React from 'react';
import axios from 'axios';

class Game extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.props = props;
    this.state = {
      loaded: false,
      gameId: this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.game === undefined) {
      axios
        .get(`/api/v1/games/${this.state.gameId}`)
        .then(request => {
          console.log(request.data);
          this.setState({ loaded: true, game: request.data });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <h1>GAME DETAIL</h1>
          <h2>{this.props.match.params.id}</h2>
          <h2>{this.state.game.name}</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading game...</h3>
        </div>
      );
    }
  }
}

export default Game;
