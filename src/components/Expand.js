import React from 'react';
import Button from 'react-bootstrap/Button';

class Expand extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.expand)
    }

    render() {
        var x = ""
        switch (this.props.expand) {
            case 0:
                x = "EXPAND X"
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
        return (<div><Button variant="outline-info"  onClick={this.handleClick}>{x}</Button></div>)
    }
}


export default Expand;