import React from 'react';
import axios from 'axios';

import PageTitle from './PageTitle';
import PersistentCharacterForm from './PersistentCharacterForm';

class PersistentCharacter extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.props = props;
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      persistentCharacter: {}
    };

    this.updatePersistentCharacter = this.updatePersistentCharacter.bind(this);
  }

  componentDidMount() {
    if (!this.state.loaded) {
      axios
        .get(`/api/v1/persistent_characters/${this.state.id}`)
        .then(request => {
          console.log(request.data);
          this.setState({ loaded: true, persistentCharacter: request.data });
        })
        .catch(error => console.log(error));
    }
  }

  updatePersistentCharacter(params) {
    console.log(params);
    axios
      .put(`/api/v1/persistent_characters/${this.state.id}`, params)
      .then(response => {
        console.log(response);

        const persistentCharacter = response.data;
        this.setState({
          persistentCharacter: persistentCharacter
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <PageTitle title="Character View" />

          <PersistentCharacterForm
            name={this.state.persistentCharacter.name}
            hit_points={this.state.persistentCharacter.hit_points}
            hit_point_maximum={this.state.persistentCharacter.hit_point_maximum}
            strength={this.state.persistentCharacter.strength}
            dexterity={this.state.persistentCharacter.dexterity}
            constitution={this.state.persistentCharacter.constitution}
            intelligence={this.state.persistentCharacter.intelligence}
            wisdom={this.state.persistentCharacter.wisdom}
            charisma={this.state.persistentCharacter.charisma}
            updateHandler={this.updatePersistentCharacter}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading character...</h3>
        </div>
      );
    }
  }
}

export default PersistentCharacter;
