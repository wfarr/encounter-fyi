import React, { Component } from 'react';

import Actor from './Actor';

class Actors extends Component {
  render() {
    return (
      <ol className="actors">
        <Actor />
      </ol>
    );
  }
}

export default Actors;