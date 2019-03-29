import React from 'react';

import './Combatants.scss';

class Combatants extends React.Component {
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
          active={this.props.currentActor === index}
        />
      );
    });

    return (
      <table className="table" onKeyDown={this.handleKeyDown}>
        <thead>
          <tr>
            <th scope="col">Initiative</th>
            <th scope="col" className="col-md-10">
              Name
            </th>
          </tr>
        </thead>
        <tbody>{combatants}</tbody>
      </table>
    );
  }
}

function Combatant(props) {
  console.log('Render a combatant', props);
  return (
    <tr
      key={props.combatant.id}
      className={props.active ? 'active' : 'inactive'}
    >
      <th scope="row">
        {props.combatant.initiative !== undefined
          ? props.combatant.initiative
          : 'N/A'}
      </th>
      <td>{props.combatant.name}</td>
    </tr>
  );
}

export default Combatants;
