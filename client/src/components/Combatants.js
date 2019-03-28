import React from 'react';

import './Combatants.scss';

class Combatants extends React.Component {
  constructor(props) {
    super(props);
  }

  currentActor() {
    return this.props.combatants[this.props.order[this.props.currentActor]];
  }

  render() {
    console.log('***combatants', this.props);
    const combatants = this.props.order.map((combatantId, index) => {
      const combatant = this.props.combatants[combatantId];
      return (
        <Combatant
          key={combatant.id}
          combatant={combatant}
          active={this.props.currentActor == index}
        />
      );
    });

    return (
      <div className="combatants" onKeyDown={this.handleKeyDown}>
        <ul>{combatants}</ul>
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
