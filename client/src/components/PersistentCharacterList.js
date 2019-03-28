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
        <ul>
          {this.state.persistentCharacters.map(persistentCharacter =>
            persistentCharacterLi(
              persistentCharacter,
              this.deletePersistentCharacter
            )
          )}
        </ul>

        <PersistentCharacterForm
          createHandler={this.createPersistentCharacter}
        />
      </div>
    );
  }
}

function persistentCharacterLi(
  persistentCharacter,
  deletePersistentCharacterHandler
) {
  return (
    <li key={persistentCharacter.id}>
      <Link
        to={{
          pathname: `/persistent_characters/${persistentCharacter.id}`,
          state: { persistentCharacter: persistentCharacter }
        }}
      >
        {persistentCharacter.name}
      </Link>

      <button
        onClick={() => deletePersistentCharacterHandler(persistentCharacter.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default PersistentCharacterList;
