import React from 'react';
import axios from 'axios';

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

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <h1>PERSISTENT CHARACTER DETAIL</h1>
          <dl>
            <dt>Name</dt>
            <dd>{this.state.persistentCharacter.name}</dd>
            <dt>Strength</dt>
            <dd>{this.state.persistentCharacter.strength}</dd>
            <dt>Dexterity</dt>
            <dd>{this.state.persistentCharacter.dexterity}</dd>
            <dt>Constitution</dt>
            <dd>{this.state.persistentCharacter.constitution}</dd>
            <dt>Intelligence</dt>
            <dd>{this.state.persistentCharacter.intelligence}</dd>
            <dt>Wisdom</dt>
            <dd>{this.state.persistentCharacter.wisdom}</dd>
            <dt>Charisma</dt>
            <dd>{this.state.persistentCharacter.charisma}</dd>
          </dl>
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
