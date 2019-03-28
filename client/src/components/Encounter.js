import React from 'react';
import axios from 'axios';

import Combatants from './Combatants';
import CombatantForm from './CombatantForm';

import PersistentCharacterList from './PersistentCharacterList';

import './Encounter.scss';

class Encounter extends React.Component {
  constructor(props) {
    super(props);

    this.handleForward = this.handleForward.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.addCombatant = this.addCombatant.bind(this);

    this.updateChildState = this.updateChildState.bind(this);
    this.props = props;
    this.state = {
      loaded: false,
      id: this.props.match.params.id,
      game_id: this.props.match.params.game_id,
      combatants: {},
      currentActor: null,
      order: []
    };
  }

  componentDidUpdate() {
    console.log('Storing state', this.state.encounter);
    axios
      .patch(`/api/v1/encounters/${this.state.id}`, {
        encounter: { state: this.state }
      })
      .then(response => {
        console.log('patch response', response);
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    if (!this.state.loaded) {
      axios
        .get(`/api/v1/encounters/${this.state.id}`)
        .then(request => {
          console.log('reloaded state', request.data);
          this.setState({ ...request.data.state, loaded: true });
          console.log('final state', this.state);
        })
        .catch(error => console.log(error));
    }
  }

  updateChildState(key, obj) {
    console.log('Updating state', key, 'with', obj);
    this.setState({ encounter: { state: { [key]: obj } } });
  }

  addCombatant(character) {
    const { id, name } = character;

    // Empty checks should be pushed into the form, but the dup check probably should happen here?
    // Or we could pass a validator down into the form.
    const errors = {};
    if (id in this.state.combatants) {
      errors.id = 'Duplicate ID';
    }
    if (id === '') {
      errors.id = 'ID Must not be empty';
    }
    if (name === '') {
      errors.name = 'Name must not be empty';
    }

    if ('id' in errors || 'name' in errors) {
      return errors;
    }

    const combatants = Object.assign(this.state.combatants, {
      [id]: character
    });
    const order = [...this.state.order, id];

    this.setState({
      combatants: combatants,
      order: order
    });

    return errors;
  }

  advanceTurn(count) {
    if (this.state.currentActor === null) {
      return;
    }
    var current = this.state.currentActor + count;
    const len = this.state.order.length;

    const newPosition = ((current % len) + len) % len;

    this.setState({ currentActor: newPosition });
  }

  handleForward(e) {
    console.log(e);

    this.advanceTurn(1);

    e.preventDefault();
  }

  handleBack(e) {
    console.log(e);

    this.advanceTurn(-1);

    e.preventDefault();
  }

  handleStart(e) {
    console.log(e);

    this.setState({ currentActor: 0 });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <dl>
            {this.state.game_id ? (
              <div>
                <dt>Game ID:</dt>
                <dd>{this.state.game_id}</dd>
              </div>
            ) : null}
            <dt>Encounter ID:</dt>
            <dd>{this.state.id}</dd>
            <dt>Name</dt>
            <dd>{this.state.name}</dd>
            <div className="container">
              <div className="libraryArea">
                <PersistentCharacterList
                  hideForm={true}
                  addToEncounter={this.addCombatant}
                />
              </div>
              <div className="combatArea">
                <Combatants
                  combatants={this.state.combatants}
                  order={this.state.order}
                  currentActor={this.state.currentActor}
                />
                <div>
                  <button onClick={this.handleBack}>{`<`}</button>
                  <button onClick={this.handleForward}>{`>`}</button>
                  <button onClick={this.handleStart}>Start</button>
                  <div>
                    <CombatantForm createHandler={this.addCombatant} />
                  </div>
                </div>
              </div>
            </div>
          </dl>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading encounter...</h3>
        </div>
      );
    }
  }
}

export default Encounter;
