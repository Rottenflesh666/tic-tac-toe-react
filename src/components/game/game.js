import React from "react";
import Board from '../board/board';
import Menu from '../menu/menu';
import './game.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array.apply(null,{length: 9}),
            fraction: true,
            isReady: false,
            steps: 9,
            endStatus: null
        };
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board isReady = {this.state.isReady}
                           curFraction = {this.state.fraction}
                           changeFraction = {this.changeFraction}
                           squaresArr = {this.state.squares}
                           onClick = {this.handlerClick}
                           isWinner = {this.state.endStatus}/>
                </div>
                <div className="game-menu">
                    <Menu onChangeFraction={this.changeFraction} onReadyButtonClick = {this.changeReadyStatus}/>
                </div>
            </div>
        );
    }

    changeFraction = (newFraction) =>{
        this.setState({
            fraction: newFraction
        })
    }
    changeReadyStatus = (isReady) =>{
        this.setState({
            isReady: isReady
        })
    }
     sillyBot(squares) {
        let emptySquares = [];
        let arr = squares;
        for (let i = 0; i < 9; i++) {
            if (arr[i] !=='X' && arr[i] !== '0') {
                emptySquares.push(i);
            }
        }
        let randIndex = 0 - 0.5 + Math.random() * emptySquares.length;
        return emptySquares[Math.round(randIndex)];
    }

    handlerClick = (i) => {
        const squares = this.state.squares;
        if (this.state.steps === -1) {
            return;
        }
        if (this.checkWinner(squares) || squares[i]) {
            this.setState({
                endStatus: this.checkWinner(squares)
            });
            return;
        }
        squares[i] = this.state.fraction ? 'X' : '0';
        let randIndex = this.sillyBot(squares);
        squares[randIndex] = !this.state.fraction ? 'X' : '0';
        let drawCounter = this.state.steps;
        drawCounter = drawCounter - 2;
        this.setState({
            squares: squares,
            steps: drawCounter
        });

        if (this.checkWinner(squares) || squares[i]) {
            this.setState({
                endStatus: this.checkWinner(squares)
            });
        }
        if (drawCounter === -1 && this.checkWinner(squares) === null) {
            this.setState({
                endStatus: "draw"
            });
        }
    }

    checkWinner(squares) {
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
                return squares[a] === 'X' ? "Horde" : "Alliance";
            }
        }
        return null;
    }
}
export default Game;
