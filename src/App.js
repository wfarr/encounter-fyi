import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/games" component={Games} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


const games = [{id: 1, name: "Storm King's Thunder"},
  {id: 2, name: "Waterdeep: Dragon Heist"},
  {id: 3, name: "Critical Roll"}
];

function Games() {
  return (
    <div>
      <h2>Games</h2>
      <ul>
        { games.map((game) => <Game key={game.id} name={game.name}/>) }
      </ul>

      <GameForm />
    </div>
  );
}

function Game(props) {
  return <li>{props.name}</li>;
}

class GameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="gameName">
          Name:
          <input type="text" id="gameName" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit"></input>
      </form>
    );
  }
}


export default App;
