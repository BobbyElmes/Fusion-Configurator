import React from 'react';
import './DropDown.css'


//handles the panel drop down menu
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
            options.push(<option style={{ direction: "rtl"}} value={i}>{widths[i]}</option>)
        return (<div style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}><p className="DropDown" style={{ fontFamily: "arial", fontSize: "80%" }}>Batten Thickness (mm)&nbsp;&nbsp; </p><select style={{ fontFamily: "arial", fontSize: "80%", width: "103px", textAlignLast: "right" }} value={this.state.panelId}
            onChange={this.handleChange} >
            {options}
        </select></div>)
    }
}


export default PackerDropDown;