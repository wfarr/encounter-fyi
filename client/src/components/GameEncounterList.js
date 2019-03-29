import React from 'react';
import { Link } from 'react-router-dom';

import GameEncounterForm from './GameEncounterForm';

import axios from 'axios';

class GameEncounterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.encounters = props.encounters || [];
    this.state.gameId = props.gameId;

    this.createGameEncounter = this.createGameEncounter.bind(this);
    this.deleteGameEncounter = this.deleteGameEncounter.bind(this);
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

  createGameEncounter(name) {
    console.log(name);
    axios
      .post(`/api/v1/games/${this.state.gameId}/encounters`, {
        game_id: this.state.gameId,
        name: name
      })
      .then(response => {
        console.log(response);

        const encounter = response.data;
        this.setState({
          encounters: [...this.state.encounters, encounter]
        });
      })
      .catch(error => console.log(error));
  }

  deleteGameEncounter(gameId, id) {
    axios
      .delete(`/api/v1/games/${gameId}/encounters/${id}`)
      .then(response => {
        console.log(response);
        this.refreshGameEncounters();
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h4>Encounters</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="col-md-4">
                Name
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.encounters.map(encounter =>
              encounterTableRow(
                this.state.gameId,
                encounter,
                this.deleteGameEncounter
              )
            )}
          </tbody>
        </table>

        <GameEncounterForm createHandler={this.createGameEncounter} />
      </div>
    );
  }
}

function encounterTableRow(gameId, encounter, deleteEncounterHandler) {
  return (
    <tr key={encounter.id}>
      <th scope="row">
        <Link to={{ pathname: `/games/${gameId}/encounters/${encounter.id}` }}>
          {encounter.name}
        </Link>
      </th>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteEncounterHandler(gameId, encounter.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default GameEncounterList;
