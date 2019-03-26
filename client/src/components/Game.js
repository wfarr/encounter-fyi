import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.props = props;
    this.state = this.props.location.state;
  }

  render() {
    return (
      <div>
        <h1>GAME DETAIL</h1>
        <h2>{this.props.match.params.id}</h2>
        <h2>{this.state.game.name}</h2>
      </div>
    );
  }
}

export default Game;
