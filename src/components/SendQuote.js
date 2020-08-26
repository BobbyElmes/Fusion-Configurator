import React from 'react';
import Button from 'react-bootstrap/Button';
import './Cell.css'

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//THIS IS/WAS AGAIN USED FOR TESTING THE EMAIL API FUNCTIONALITY AND IS CURRENTLY NOT IN USE
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------


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