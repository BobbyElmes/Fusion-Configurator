import React from 'react';
import Portrait from '.././Imgs/Portrait.svg'
import Landscape from '.././Imgs/Landscape.svg'
import './Fonts.css'

//Handles the orientation button
class Orientation extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.clear)
    }

    render() {
        //Set variables to portrait settings, if landscape is true then change it
        var img = Portrait
        var text = this.props.portland[0]
        var imgMargin = -5;
        if (this.props.landscape == true) {
            img = Landscape
            text = this.props.portland[1]
            imgMargin = -2;
        }
        imgMargin = imgMargin.toString()
        imgMargin += "%"
        if(this.props.mobile)
            return (<div style={{ display: "flex", flexDirection: "row" }}><img style={{ marginRight: imgMargin, cursor: "pointer" }} src={img} width="80%" height="100%" onClick={this.handleClick} /></div >)
        else
            return (<div style={{ display: "flex", flexDirection: "row" }}><img style={{ marginRight: imgMargin, cursor: "pointer" }} src={img} width="80px" height="100%" onClick={this.handleClick} /><p className="TitleFont" style={{ fontSize: "140%", marginTop: "auto", marginBottom: 0 }}>{text}</p></div >)
    }
}


export default Orientation;