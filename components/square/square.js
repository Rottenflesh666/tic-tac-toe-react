import React from "react";
import horde from "../../images/horde1.png";
import alliance from "../../images/alliance.png";
import './square.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            <img src={props.value === "X" ? horde : props.value === "0" ? alliance : ""}/>
        </button>
    );
}
export default Square;
