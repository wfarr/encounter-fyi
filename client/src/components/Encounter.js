import React from 'react';
import axios from 'axios';

import Combatants from './Combatants';

import './Encounter.scss';

class Encounter extends React.Component {
  constructor(props) {
    super(props);

    this.updateChildState = this.updateChildState.bind(this);
    this.props = props;
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      gameId: this.props.match.params.game_id,
      encounter: {
        state: {
          combatants: {}
        }
      }
    };
  }

  componentDidUpdate() {
    console.log('Storing state', this.state.encounter);
    axios
      .patch(`/api/v1/encounters/${this.state.id}`, {
        encounter: { state: this.state.encounter.state }
      })
      .then(response => {
        console.log('patch response', response);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    if (!this.state.loaded) {
      axios
        .get(`/api/v1/encounters/${this.state.id}`)
        .then(request => {
          console.log('reloaded state', request.data);
          this.setState({ loaded: true, encounter: request.data });
          console.log(this.state);
        })
        .catch(error => console.log(error));
    }
  }

  updateChildState(key, obj) {
    console.log('Updating state', key, 'with', obj);
    this.setState({ encounter: { state: { [key]: obj } } });
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
              <Combatants
                combatants={this.state.encounter.state.combatants}
                updateHandler={s => this.updateChildState('combatants', s)}
              />
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
