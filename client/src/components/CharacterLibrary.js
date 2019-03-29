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
      <table className="table">
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
          {this.state.persistentCharacters.map(persistentCharacter => (
            <CharacterLibraryRow
              pc={persistentCharacter}
              addCharacterHandler={this.props.addCharacterHandler}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

class CharacterLibraryRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { initiative: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ initiative: event.target.value });
  }

  handleSubmit(event) {
    const pc = { ...this.props.pc, initiative: this.state.initiative };
    console.log('Adding!', pc);
    this.props.addCharacterHandler(pc);
  }

  render() {
    return (
      <tr key={this.props.pc.id}>
        <th scope="row">{this.props.pc.id}</th>
        <td>{this.props.pc.name}</td>
        <td>
          <input
            type="number"
            name="initiative"
            onChange={this.handleChange}
            value={this.state.initiative}
          />
        </td>
        <td>
          <button className="btn btn-info btn-sm" onClick={this.handleSubmit}>
            Add
          </button>
        </td>
      </tr>
    );
  }
}

export default CharacterLibrary;
