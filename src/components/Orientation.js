import React from 'react';
import Button from 'react-bootstrap/Button';
import Portrait from '.././Imgs/Portrait.svg'
import Landscape from '.././Imgs/Landscape.svg'
import './Fonts.css'

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
        var imgMargin = -5;
        if (this.props.landscape == true) {
            img = Landscape
            text = "Landscape"
            imgMargin = -2;
        }
        imgMargin = imgMargin.toString()
        imgMargin += "%"
        return (<div style={{ display: "flex", flexDirection: "row" }}><img style={{marginRight:imgMargin, cursor:"pointer"}} src={img} width="80px" height="100%" onClick={this.handleClick} /><p className="TitleFont" style={{ fontSize:"140%",marginTop: "auto", marginBottom:0 }}>{text}</p></div >)
    }
}


export default Orientation;