import React from 'react';

class PersistentCharacterForm extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      name: props.name || '',
      strength: props.strength || 1,
      dexterity: props.dexterity || 1,
      constitution: props.constitution || 1,
      intelligence: props.intelligence || 1,
      wisdom: props.wisdom || 1,
      charisma: props.charisma || 1,
      hit_point_maximum: props.hit_point_maximum || 1,
      hit_points: props.hit_points || 0
    };

    this.createHandler = props.createHandler;
    this.updateHandler = props.updateHandler;

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
    if (this.createHandler) {
      this.createHandler(this.state);
    } else if (this.updateHandler) {
      this.updateHandler(this.state);
    }
    event.preventDefault();
  }

  render() {
    console.log(this.state);

    return (
      <form onSubmit={this.handleSubmit}>
        {/* name, hp, max hp */}
        <div className="row">
          <div className="form-group col-md-8">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Enter name..."
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="hit_points">Current HP</label>
            <input
              className="form-control"
              type="number"
              name="hit_points"
              min="1"
              max={this.state.hit_point_maximum}
              value={this.state.hit_points}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="hit_point_maximum">Max HP</label>
            <input
              className="form-control"
              type="number"
              name="hit_point_maximum"
              min="1"
              value={this.state.hit_point_maximum}
              onChange={this.handleChange}
            />
          </div>
        </div>

        {/* str, dex, con */}
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="strength">Strength</label>
            <input
              className="form-control"
              type="number"
              name="strength"
              min="1"
              value={this.state.strength}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="dexterity">Dexterity</label>
            <input
              className="form-control"
              type="number"
              name="dexterity"
              min="1"
              value={this.state.dexterity}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="constitution">Constitution</label>
            <input
              className="form-control"
              type="number"
              name="constitution"
              min="1"
              value={this.state.constitution}
              onChange={this.handleChange}
            />
          </div>
        </div>

        {/* int, wis, cha */}
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="intelligence">Intelligence</label>
            <input
              className="form-control"
              type="number"
              name="intelligence"
              min="1"
              value={this.state.intelligence}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="wisdom">Wisdom</label>
            <input
              className="form-control"
              type="number"
              name="wisdom"
              min="1"
              value={this.state.wisdom}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="charisma">Charisma</label>
            <input
              className="form-control"
              type="number"
              name="charisma"
              min="1"
              value={this.state.charisma}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-md">
          {this.createHandler ? 'Create' : 'Update'} Character
        </button>
      </form>
    );
  }
}

export default PersistentCharacterForm;
