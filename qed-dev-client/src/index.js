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

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blokken: Array(9).fill(null),
      volgendeIsX: true,
    };
  }

  handleClick(i) {
    const blokken  = this.state.blokken.slice();
    if (bepaalWinnaar(blokken) || blokken[i]) {
      return;
    }
    blokken[i] = this.state.volgendeIsX ? 'X' : 'Q';
    this.setState({
      blokken: blokken,
      volgendeIsX: !this.state.volgendeIsX,
    });
  }

  renderSquare(i) {
    // return <Square value={this.state.blokken[i]} />;
    return (
      <Square
        value={this.state.blokken[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winnaar =  bepaalWinnaar(this.state.blokken);
    let status;
    if (winnaar) {
      status = 'Winnaar is: ' + winnaar;
    } else {
      status = 'Next player: ' + (this.state.volgendeIsX ? 'X' : 'Q');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(324)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function bepaalWinnaar(blokken) {
  const regels = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
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
  <Game />,
  document.getElementById('root')
);
