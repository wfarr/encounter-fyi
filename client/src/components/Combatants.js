import React from 'react';

import CombatantForm from './CombatantForm';

import './Combatants.scss';

const sampleCombatants = {
  '1': { id: '1', name: 'Theren' },
  '2': { id: '2', name: 'Maraby' },
  '3': { id: '3', name: 'Valanche' },
  '4': { id: '4', name: 'Anris' },
  '5': { id: '5', name: 'Margritte' }
};
class Combatants extends React.Component {
  constructor(props) {
    super(props);

    this.handleForward = this.handleForward.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.newCombatant = this.newCombatant.bind(this);

    this.state = {
      combatants: sampleCombatants,
      order: ['2', '1', '4', '3', '5'],
      currentActor: 0
    };
  }

  newCombatant(id, name) {
    console.log('Adding Character:', id, name);
    console.log(this.state);

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
      [id]: { id: id, name: name }
    });
    const order = [...this.state.order, id];

    this.setState({
      combatants: combatants,
      order: order
    });

    return errors;
  }

  currentActor() {
    return this.state.combatants[this.order[this.state.currentActor]];
  }

  advanceTurn(count) {
    var current = this.state.currentActor + count;
    const len = this.state.order.length;

    const newPosition = ((current % len) + len) % len;

    this.setState({
      currentActor: newPosition
    });
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

  render() {
    const combatants = this.state.order.map((combatantId, index) => {
      const combatant = this.state.combatants[combatantId];
      return (
        <Combatant
          key={combatant.id}
          combatant={combatant}
          active={this.state.currentActor == index}
        />
      );
    });

    return (
      <div className="combatants" onKeyDown={this.handleKeyDown}>
        <ul>{combatants}</ul>
        <button onClick={this.handleBack}>{`<`}</button>
        <button onClick={this.handleForward}>{`>`}</button>
        <div>
          <CombatantForm createHandler={this.newCombatant} />
        </div>
      </div>
    );
  }
}

function Combatant(props) {
  return (
    <li className={props.active ? 'active' : 'inactive'}>
      {props.combatant.name}
    </li>
  );
}

export default Combatants;
