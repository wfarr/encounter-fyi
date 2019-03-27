import React from 'react';

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

    this.state = {
      combatants: sampleCombatants,
      order: ['2', '1', '4', '3', '5'],
      currentActor: 0
    };
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
