import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from './PageTitle';

import PersistentCharacterForm from './PersistentCharacterForm';

import axios from 'axios';

class CharacterLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.persistentCharacters = [];
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
                this.props.addCharacterHandler
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function persistentCharacterTableRow(pc, addHandler) {
  return (
    <tr key={pc.id}>
      <th scope="row">{pc.id}</th>
      <td>{pc.name}</td>
      <td>
        <button className="btn btn-info btn-sm" onClick={() => addHandler(pc)}>
          Add
        </button>
      </td>
    </tr>
  );
}

export default CharacterLibrary;
