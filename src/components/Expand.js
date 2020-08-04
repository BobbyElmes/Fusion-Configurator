import React from 'react';
import Button from 'react-bootstrap/Button';
import Arrow from '.././Imgs/Arrow.png'

class Expand extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.expand)
    }

    render() {
        var x 
        switch (this.props.expand) {
            case 0:
                x = <img src={Arrow} onClick={this.handleClick} style={{ transform:"rotate(90deg)", width:"40%"}}/>
                break;
            case 1:
                x = "REDUCE X"
                break;
            case 2:
                x = "EXPAND Y"
                break;
            case 3:
                x = "REDUCE Y"
                break;
        }
        return (<div>{x}</div>)
    }
}


export default Expand;