import React from 'react';
import './DropDown.css'


//Handles the batten thickness dropdown menu
class PackerDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widthId: 0,
            widths: [25, 0, 22, 30, 35, 40, 45, 50]
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.press(this.state.widths[e.target.value])
        this.setState({
            widthId: e.target.value
        })

    }

    render() {
        var widths = this.state.widths
        var options = []
        for (var i = 0; i < widths.length; i++)
            options.push(<option style={{ direction: "rtl" }} value={i}>{widths[i]}</option>)

        if (this.props.mobile) {
            return (<div style={{ display: "flex", flexDirection: "row", marginTop: "5%", alignItems: "center", justifyContent: "center", width: this.props.mobilePacker}}><p className="DropDown" style={{ fontFamily: "arial", fontSize: "60%", marginTop: "-4px" }}>{this.props.battenWord}&nbsp;&nbsp; </p><select style={{ fontFamily: "arial", fontSize: "70%", height: "30px", width: "110px", textAlignLast: "right" }} value={this.state.panelId}
                onChange={this.handleChange} >
                {options}
            </select></div>)
        }
        else
            return (<div style={{ display: "flex", flexDirection: "row", marginTop: "5%", alignItems: "center", flexShrink: "0",  justifyContent: "center" }}><p className="DropDown" style={{ fontFamily: "arial", fontSize: "80%" }}>{this.props.battenWord}&nbsp;&nbsp; </p><select style={{ fontFamily: "arial", fontSize: "80%",  width: "110px", textAlignLast: "right" }} value={this.state.panelId}
                onChange={this.handleChange} >
                {options}
            </select></div>)
    }
}


export default PackerDropDown;