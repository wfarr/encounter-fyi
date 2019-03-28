import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from './PageTitle';

import PersistentCharacterForm from './PersistentCharacterForm';

import axios from 'axios';

class PersistentCharacterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.persistentCharacters = [];

    this.createPersistentCharacter = this.createPersistentCharacter.bind(this);
    this.deletePersistentCharacter = this.deletePersistentCharacter.bind(this);
  }

  refreshPersistentCharacters() {
    axios
      .get('/api/v1/persistent_characters.json')
      .then(response => {
        console.log(response);
        this.setState({
          persistentCharacters: response.data
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.refreshPersistentCharacters();
  }

  createPersistentCharacter(params) {
    console.log(params);
    axios
      .post('/api/v1/persistent_characters', params)
      .then(response => {
        console.log(response);

        const persistentCharacter = response.data;
        this.setState({
          persistentCharacters: [
            ...this.state.persistentCharacters,
            persistentCharacter
          ]
        });
      })
      .catch(error => console.log(error));
  }

  deletePersistentCharacter(id) {
    axios
      .delete(`/api/v1/persistent_characters/${id}`)
      .then(response => {
        console.log(response);
        this.refreshPersistentCharacters();
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <PageTitle title="Characters" />

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
            {this.state.persistentCharacters.map(persistentCharacter =>
              persistentCharacterTableRow(
                persistentCharacter,
                this.deletePersistentCharacter
              )
            )}
          </tbody>
        </table>

        <hr />

        <h4>Create a Character</h4>
        <PersistentCharacterForm
          createHandler={this.createPersistentCharacter}
        />
      </div>
    );
  }
}

function persistentCharacterTableRow(pc, deletePersistentCharacterHandler) {
  return (
    <tr key={pc.id}>
      <th scope="row">{pc.id}</th>
      <td>
        <Link
          to={{
            pathname: `/persistent_characters/${pc.id}`,
            state: { persistentCharacter: pc }
          }}
        >
          {pc.name}
        </Link>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deletePersistentCharacterHandler(pc.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default PersistentCharacterList;
