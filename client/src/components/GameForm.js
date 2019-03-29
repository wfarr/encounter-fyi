import React from 'react';

class GameForm extends React.Component {
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
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Enter name..."
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-4">
            <button type="submit" className="btn btn-primary btn-md">
              {this.createHandler ? 'Create' : 'Update'} Game
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default GameForm;
