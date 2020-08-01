import React from 'react';
import Button from 'react-bootstrap/Button';

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
        return (<div><Button variant="outline-info" onClick={this.handleClick}>{x}</Button></div>)
    }
}


export default SendQuote;