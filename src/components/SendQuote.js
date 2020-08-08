import React from 'react';
import Button from 'react-bootstrap/Button';
import './Cell.css'

class SendQuote extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press()
    }

    render() {
        var x = "SEND QUOTE"
        return (<div><Button variant="danger" className="Send" onClick={this.handleClick}>{x}</Button></div>)
    }
}


export default SendQuote;