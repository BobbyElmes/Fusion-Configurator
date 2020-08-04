import React from 'react';
import Button from 'react-bootstrap/Button'
import PanelList from './PanelList.js'
import './DropDown.css'
import './Fonts.css'

//handles the panel drop down menu
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
        var panels = PanelList.map(item => item.id)
        var options = []
        for (var i = 0; i < panels.length; i++)
            options.push(<option style={{ direction: "rtl" }} value={i}>{panels[i]}</option>)
        return (<div className="DropDown2"><div style={{ display: "flex", flexShrink:"0", flexDirection: "row" }}><p className="DropDown" style={{ fontFamily: "arial", fontSize: "80%" }}>Panels &nbsp; &nbsp;</p><select style={{ fontFamily: "arial", fontSize: "80%", textAlignLast: "right"}} value={this.state.panelId}
            onChange={this.handleChange} >
            {options}
            </select></div></div>)
    }
}


export default PanelDropDown;