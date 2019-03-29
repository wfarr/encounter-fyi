import React from 'react';
import axios from 'axios';

import PageTitle from './PageTitle';
import GameEncounterList from './GameEncounterList';

class Game extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.props = props;
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      game: {}
    };
  }

  componentDidMount() {
    if (!this.state.loaded) {
      axios
        .get(`/api/v1/games/${this.state.id}`)
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
          <PageTitle title={`${this.state.game.name}`} />

          <GameEncounterList
            gameId={this.state.id}
            encounters={this.state.game.encounters}
          />
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
