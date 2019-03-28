import React from 'react';

import './CombatantForm.scss';

class CombatantForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: '', name: '', errors: {} };

    this.createHandler = props.createHandler;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log('change', this.state);
  }

  handleSubmit(event) {
    const error = Object.assign(
      {},
      this.createHandler({ id: this.state.id, name: this.state.name })
    );

    this.setState({ errors: error });

    console.log('after submit', this.state);

    event.preventDefault();
  }

  render() {
    console.log('in render', this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            ID:
            <input
              type="text"
              name="id"
              value={this.state.id}
              onChange={this.handleChange}
            />
            {this.state.errors.id && (
              <span className="error">{this.state.errors.id}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            {this.state.errors.name && (
              <span className="error">{this.state.errors.name}</span>
            )}
          </label>
        </div>
        <input type="submit" />
      </form>
    );
  }
}

export default CombatantForm;
