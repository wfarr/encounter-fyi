
import React, { Component } from 'react';
import './Frame.css';
import Actors from './Actors'

class Frame extends Component {
  render() {
    return (
      <div className="frame">
        <h1 className="fheader">
          STUFF STUFF
        </h1>
        <Actors />
      </div>
    );
  }
}
export default Frame;