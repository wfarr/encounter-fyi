import React from 'react';

class PersistentCharacterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
      hit_point_maximum: 1,
      hit_points: 0
    };

    this.createHandler = props.createHandler;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.createHandler(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Hit Point Maximum:
          <input
            type="number"
            name="hit_point_maximum"
            min="1"
            value={this.state.hit_point_maximum}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Hit Points:
          <input
            type="number"
            name="hit_points"
            min="0"
            value={this.state.hit_points}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Strength:
          <input
            type="number"
            name="strength"
            min="1"
            max="20"
            value={this.state.strength}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Dexterity:
          <input
            type="number"
            name="dexterity"
            min="1"
            max="20"
            value={this.state.dexterity}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Constitution:
          <input
            type="number"
            name="constitution"
            min="1"
            max="20"
            value={this.state.constitution}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Intelligence:
          <input
            type="number"
            name="intelligence"
            min="1"
            max="20"
            value={this.state.intelligence}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Wisdom:
          <input
            type="number"
            name="wisdom"
            min="1"
            max="20"
            value={this.state.wisdom}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Charisma:
          <input
            type="number"
            name="charisma"
            min="1"
            max="20"
            value={this.state.charisma}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

export default PersistentCharacterForm;
