import React from 'react';
import './DropDown.css'
import './Fonts.css'

//Handles the panel drop down menu
class PanelDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            panelId: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.press(e.target.value)
        this.setState({
                panelId: e.target.value
        })
        
    }

    render() {
        var panels = this.props.ids
        var options = []
        for (var i = 0; i < panels.length; i++)
            if(panels[i] != null)
                options.push(<option style={{ direction: "rtl" }} value={i}>{panels[i]}</option>)
        if (this.props.mobile)
            return (<div className="DropDown2"><div style={{ display: "flex", flexShrink: "0", flexDirection: "row", alignItems: "center", justifyContent: "center" }}><p className="DropDown" style={{ fontFamily: "arial",  fontSize: "60%",marginTop:"-0px" }}>{this.props.panelWord} &nbsp; &nbsp;</p><select style={{ width: "110px", height: "30px", fontFamily: "arial", fontSize: "70%", textAlignLast: "right" }} value={this.state.panelId}
                onChange={this.handleChange} >
                {options}
            </select></div></div>)
        else
            return (<div className="DropDown2"><div style={{ display: "flex", flexShrink: "0", flexDirection: "row" }}><p className="DropDown" style={{ fontFamily: "arial", fontSize: "80%" }}>{this.props.panelWord} &nbsp; &nbsp;</p><select style={{ width: "110px", fontFamily: "arial", fontSize: "80%", textAlignLast: "right" }} value={this.state.panelId}
                onChange={this.handleChange} >
                {options}
            </select></div></div>)
    }
}


export default PanelDropDown;