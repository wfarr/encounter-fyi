import React from 'react';
import { Link } from 'react-router-dom';

// import GameEncounterForm from './GameEncounterForm';

import axios from 'axios';

{
  /* TODO: Make this passed in or managed somewhere else, maybe? */
}

class GameEncounterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.encounters = props.encounters || [];
    this.state.gameId = props.gameId;

    this.createEncounter = this.createEncounter.bind(this);
  }

  refreshGameEncounters() {
    axios
      .get(`/api/v1/games/${this.state.gameId}/encounters.json`)
      .then(response => {
        console.log(response);
        this.setState({
          encounters: response.data
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.refreshGameEncounters();
  }

  createEncounter(name) {
    console.log(name);
    axios
      .post(`/api/v1/games/${this.state.gameId}/encounters`, { name: name })
      .then(response => {
        console.log(response);

        const encounter = response.data;
        this.setState({
          encounters: [...this.state.encounters, encounter]
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h2>Game Encounters</h2>
        <ul>
          {this.state.encounters.map(encounter =>
            encounterLi(this.state.gameId, encounter)
          )}
        </ul>

        {/* <EncounterForm createHandler={this.createEncounter} /> */}
      </div>
    );
  }
}

function encounterLi(gameId, encounter) {
  return (
    <li key={encounter.id}>
      <Link to={{ pathname: `/games/${gameId}/encounters/${encounter.id}` }}>
        {encounter.name}
      </Link>
    </li>
  );
}

export default GameEncounterList;
