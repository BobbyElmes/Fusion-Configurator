import React from 'react';
import Button from 'react-bootstrap/Button';

class Window extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.expand)
    }

    render() {
        var x = "VELUX W"
        return (<div><Button variant="outline-info" onClick={this.handleClick}>{x}</Button></div>)
    }
}


export default Window;