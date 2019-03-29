import React from 'react';

class GameEncounterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.createHandler = props.createHandler;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.createHandler(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-4">
            <button type="submit" className="btn btn-primary btn-md">
              Add Encounter
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default GameEncounterForm;
