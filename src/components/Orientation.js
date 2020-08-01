import React from 'react';
import Button from 'react-bootstrap/Button';

class Orientation extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.clear)
    }

    render() {
        var y = "LANDSCAPE"
        if (this.props.landscape == true)
            y = "PORTRAIT"
        var x = "CHANGE LAYOUT TO " + y
        return (<div><Button variant="outline-info" onClick={this.handleClick}>{x}</Button></div>)
    }
}


export default Orientation;