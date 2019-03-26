import React from 'react';

class EncounterForm extends React.Component {
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
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

export default EncounterForm;
