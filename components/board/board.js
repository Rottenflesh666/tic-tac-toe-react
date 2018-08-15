import React from "react";
import Square from '../square/square';
import './board.css';

class Board extends React.Component {
    render() {
        if(!this.props.isReady) {
            return(<div className="status">( ͡° ͜ʖ ͡°)</div>);
        }
        else{
            let winner = this.props.isWinner;
            let status;
            if(winner === "Horde"){
                status = "HORDE WINS!";
                setTimeout(this.reload,2000);
            }
            else if(winner === "Alliance"){
                status = "Alliance wins!"
                setTimeout(this.reload,2000);
            }else if(winner === "draw"){
                status = "Draw :P";
                setTimeout(this.reload,2000);
            }else{
                status = this.props.curFraction ? "FOR THE HORDE!" : "Alliance turn to attack!";
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
                        {this.renderSquare(8)}
                    </div>
                </div>
            );
        }
    }

    reload() {
        window.location.reload();
    }

    renderSquare(i) {
        return <Square
            value={this.props.squaresArr[i]}
            onClick={() => this.props.onClick(i)}/>;
    }
}
export default Board;
