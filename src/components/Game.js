import React, { Component } from 'react';

class Game extends React.Component {
  render() {
    return (
    <li>
      {this.props.name}
    </li>
    );
  }
}

export default Game;