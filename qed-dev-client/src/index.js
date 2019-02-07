import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class Square extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: null,
  //   };
  // }

//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() =>
//           // alert('Halla!')
//           // this.setState({value: 'Y'})
//           this.props.onClick()
//         }>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// Instead of a class Square (above) we create a function Square (in a class we need "this", in a function we do not.:

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Users />
        <Game />
      </div>
    )
  }
}


class Header extends React.Component {
  render() {
    return (
        <div className="header">
          "Boter, Kaas en Eieren"<br />
          <a href="/googlemaps"> Testpagina</a>
        </div>
      );
  }
}


class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ["sfa"],
    };
  }
  getUsers(){
    var sers = null;
    var urll = '/list';
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          sers = (this.responseText);
          console.log(this.responseText);
      }
    };
    request.open('GET', urll, true);
    // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send();
    // request.setRequestHeader('X-CSRF-Token', AUTH_TOKEN);

    // this.setState({
    //   users : sers,
    // });

  }

  render() {
    //const users = this.state.users;
    return (
        <div className="users">
          "Gebruikers:"<br />
          {this.getUsers()}
        </div>
      );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, row, col) {
    return (
      <Square
        value={this.props.blokken[i]}

        onClick={() => this.props.onClick(i, row, col)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 1, 1)}
          {this.renderSquare(1, 1, 2)}
          {this.renderSquare(2, 1, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 2, 1)}
          {this.renderSquare(4, 2, 2)}
          {this.renderSquare(5, 2, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 3, 1)}
          {this.renderSquare(7, 3, 2)}
          {this.renderSquare(33, 3, 3)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geschiedenis: [{
        blokken: Array(9).fill(null),
        locations: Array(9).fill([0, 0])
      }],
      stapNr: 0,
      volgendeIsX: true,
    };
  }

  handleClick(i, r, c) {
    const geschiedenis = this.state.geschiedenis.slice(0, this.state.stapNr + 1);
    const nu = geschiedenis[geschiedenis.length - 1];
    const blokken  = nu.blokken.slice();
    const locations = nu.locations.slice();
    if (bepaalWinnaar(blokken) || blokken[i]) {
      return;
    }
    locations[geschiedenis.length - 1] = [ r, c ];
    blokken[i] = this.state.volgendeIsX ? 'X' : 'Q';
    this.setState({
      geschiedenis: geschiedenis.concat([{
        blokken: blokken,
        locations: locations
      }]),
      stapNr: geschiedenis.length,
      volgendeIsX: !this.state.volgendeIsX
    });
  }

  gaNaar(stap) {
    this.setState({
      stapNr: stap,
      volgendeIsX: (stap % 2) === 0,
    });
  }

  render() {
    const geschiedenis = this.state.geschiedenis;
    const nu = geschiedenis[this.state.stapNr];
    const last = geschiedenis[geschiedenis.length - 1];
    const winnaar = bepaalWinnaar(nu.blokken);
    const bloks = nu.blokken;
    const locs = last.locations;
    const next = this.state.stapNr;
    // const location = this.state.location;

    const zetten = geschiedenis.map(
        (stap, zet) => {
          const tekst = zet ? 'Ga naar zet nr.' + zet : 'Terug naar start';
          const tekst2 = zet ? 'deze zet: rij' + locs[zet - 1][0] + 'positie ' + locs[zet - 1][1] : '';
          return (
            <li key={zet}>
              <button onClick={() => this.gaNaar(zet)}>
                {tekst}
              </button>
              {tekst2}
            </li>
          );
        }
      );


    let status;
    if (winnaar) {
      status = 'Winnaar: ' + winnaar;
    } else {
      status = 'Volgende speler: ' + (this.state.volgendeIsX ? 'X' : 'Q');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            blokken={nu.blokken}
            onClick={(i, r, c) => this.handleClick(i, r, c)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{zetten}</ol>
        </div>
      </div>
    );
  }
}

function bepaalWinnaar(blokken) {
  const regels = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 33],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 33],
    [0, 4, 33],
    [2, 4, 6],
  ];
  for (let i = 0; i < regels.length; i++) {
    const [a, b, c] = regels[i];
    if (blokken[a] && blokken[a] === blokken[b] && blokken[a] === blokken[c]) {
      return blokken[a];
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
);

ReactDOM.render(
  <HomePage />,
  document.getElementById('qed')
);
