import React from "react";
import './menu.css';

class Menu extends React.Component {
    render() {
        return (
            <div>
                <div className="fractionChoice">
                    Choose fraction
                    <p><input type="radio" id="horde" value="horde" name="fraction"
                              onChange={()=>{this.props.onChangeFraction(true)}} checked={true}/>Horde</p>
                    <p><input type="radio" value="alliance" name="fraction"
                              onChange={()=>{this.props.onChangeFraction(false)}}/>Alliance</p>
                </div>
                <div>
                    <button className="submit" onClick={()=>this.props.onReadyButtonClick(true)}>
                        Start
                    </button>
                </div>
            </div>
        )
    }
}
export default Menu;
