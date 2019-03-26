import React from 'react';

class Encounter extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    this.props = props;
    this.state = this.props.location.state;
  }

  render() {
    return (
      <div>
        <h1>Encounter DETAIL</h1>
        <h2>{this.props.match.params.id}</h2>
        <h2>{this.state.encounter.name}</h2>
      </div>
    );
  }
}

export default Encounter;
