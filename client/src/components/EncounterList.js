import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from './PageTitle';
import EncounterForm from './EncounterForm';

import axios from 'axios';

class EncounterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.encounters = [];

    this.createEncounter = this.createEncounter.bind(this);
    this.deleteEncounter = this.deleteEncounter.bind(this);
  }

  refreshEncounters() {
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
    this.refreshEncounters();
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

  deleteEncounter(id) {
    axios
      .delete(`/api/v1/encounters/${id}`)
      .then(response => {
        console.log(response);
        this.refreshEncounters();
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <PageTitle title="Encounters" />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" className="col-md-4">
                Name
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.state.encounters.map(encounter =>
              encounterTableRow(encounter, this.deleteEncounter)
            )}
          </tbody>
        </table>

        <EncounterForm createHandler={this.createEncounter} />
      </div>
    );
  }
}

function encounterTableRow(encounter, deleteEncounterHandler) {
  return (
    <tr key={encounter.id}>
      <th scope="row">
        <Link to={{ pathname: `/encounters/${encounter.id}` }}>
          {encounter.id}
        </Link>
      </th>
      <th>
        <Link to={{ pathname: `/encounters/${encounter.id}` }}>
          {encounter.name}
        </Link>
      </th>

      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteEncounterHandler(encounter.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default EncounterList;
