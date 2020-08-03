import React from 'react';
import Button from 'react-bootstrap/Button';
import Portrait from '.././Imgs/Portrait.svg'
import Landscape from '.././Imgs/Landscape.svg'

class Orientation extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.clear)
    }

    render() {
        var img = Portrait
        var text = "Portrait"
        if (this.props.landscape == true) {
            img = Landscape
            text = "Landscape"
        }
        return (<div style={{ display: "flex", flexDirection: "row" }}><img src={img} width="25%" height="100%" onClick={this.handleClick} /><p style={{ marginTop: "auto", marginBottom:0 }}>{text}</p></div >)
    }
}


export default Orientation;