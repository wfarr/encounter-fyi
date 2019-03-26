import React from 'react';
import { Link } from 'react-router-dom';

import EncounterForm from './EncounterForm';

import axios from 'axios';

{
  /* TODO: Make this passed in or managed somewhere else, maybe? */
}

class EncounterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.encounters = [];

    this.createEncounter = this.createEncounter.bind(this);
  }

  refreshGames() {
    axios
      .get('/api/v1/encounters.json')
      .then(response => {
        console.log(response);
        this.setState({
          encounters: response.data
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.refreshGames();
  }

  createEncounter(name) {
    console.log(name);
    axios
      .post('/api/v1/encounters', { name: name })
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
        <h2>Encounters</h2>
        <ul>{this.state.encounters.map(encounter => encounterLi(encounter))}</ul>

        <EncounterForm createHandler={this.createEncounter} />
      </div>
    );
  }
}

function encounterLi(encounter) {
  return (
    <li key={encounter.id}>
      <Link to={{ pathname: `/encounters/${encounter.id}`, state: { encounter: encounter } }}>
        {encounter.name}
      </Link>
    </li>
  );
}

export default EncounterList;
