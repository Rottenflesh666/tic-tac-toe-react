import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import horde from './images/horde1.png';
import alliance from './images/alliance.png';

//unlocks the board
var noReady = true;
//default fraction - horde!
var fraction = true;

var firstTurn = true;

var steps = 9;

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            <img src={props.value === "X" ? horde : props.value === "0" ? alliance : ""}/>
        </button>
    );
}

function sillyBot(props){
    var emptySquares = [];
    var arr = props;
    for(var i=0; i < 9; i++) {
        if(arr[i] === null){
            emptySquares.push(i);
        }
    }
    let randIndex = 0 - 0.5 + Math.random()*emptySquares.length;
    return emptySquares[Math.round(randIndex)];
}

function reload() {
    window.location.reload();
}


class Board extends React.Component {
   constructor(props){
       super(props);
       this.state ={
           squares: Array(9).fill(null),
           turn: true,
       };
   }

   handlerClick(i) {
       if (firstTurn) {
           fraction ? this.state.turn = true : this.state.turn = false;
           firstTurn = !firstTurn;
       }
       const squares = this.state.squares.slice();
       if (checkWinner(squares) || squares[i] || noReady) {
           return;
       }
       squares[i] = this.state.turn ? 'X' : '0';
       this.state.turn = !this.state.turn;
       steps--;
       var randIndex = sillyBot(squares);
       squares[randIndex] = this.state.turn ? 'X' : '0';
       //squares[i+1] = '0';
       this.setState({
           squares: squares,
           turn: !this.state.turn,
       });
       steps--;
   }


    renderSquare(i) {
        return <Square
                value={this.state.squares[i]}
                onClick = {() => this.handlerClick(i)}/>;
    }

    render() {
        var winner = checkWinner(this.state.squares);
        let status;
        let reloadStatus;
        if(winner){
            status = winner + " wins!";
            reloadStatus = "Wait 2 sec to start again"
            setTimeout(reload,2000);
        } else if(steps <= 0){
            status = "Draw :P";
            reloadStatus = "Wait 2 sec to start again"
            setTimeout(reload,2000);
        }else{
            status = noReady ? "" : this.state.turn ? "FOR THE HORDE!" : "Alliance turn to attack!";
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="reloadStatus">{reloadStatus}</div>
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
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Preparation extends React.Component {
    unlockBoard(){
        if(!noReady){
            return
        }
        document.getElementById("horde").checked ? fraction = true : fraction = false;

        fraction?alert("FOR THE HORDE!"):alert("For the alliance!");
        noReady = false;
    }


    render() {
        return (
            <div>
                <div className="fractionChoice">
                    Choose fraction
                    <p><input type="radio" id="horde" value="horde" name="fraction" checked={true}/>Horde</p>
                    <p><input type="radio" value="alliance" name="fraction" />Alliance</p>
                </div>
                <div>
                    <button className="submit" onClick={this.unlockBoard}>
                        Start
                    </button>
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-mode">
                    <Preparation />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function checkWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a] === 'X'?"Horde":"Alliance";
        }
    }
    return null;
}