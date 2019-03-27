import React from 'react';
import axios from 'axios';

import Combatants from './Combatants';

import './Encounter.scss';

class Encounter extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.props = props;
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      gameId: this.props.match.params.game_id,
      encounter: {}
    };
  }

  componentDidMount() {
    if (!this.state.loaded) {
      axios
        .get(`/api/v1/encounters/${this.state.id}`)
        .then(request => {
          console.log(request.data);
          this.setState({ loaded: true, encounter: request.data });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <h1>ENCOUNTER DETAIL</h1>
          <dl>
            {this.state.encounter.game_id ? (
              <div>
                <dt>Game ID:</dt>
                <dd>{this.state.encounter.game_id}</dd>
              </div>
            ) : null}
            <dt>Encounter ID:</dt>
            <dd>{this.state.id}</dd>
            <dt>Name</dt>
            <dd>{this.state.encounter.name}</dd>
            <div className="container">
              <Combatants />
            </div>
          </dl>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading encounter...</h3>
        </div>
      );
    }
  }
}

export default Encounter;
