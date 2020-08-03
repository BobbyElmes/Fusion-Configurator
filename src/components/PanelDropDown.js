import React from 'react';
import Button from 'react-bootstrap/Button'
import PanelList from './PanelList.js'
import './DropDown.css'

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
            options.push(<option value={i}>{panels[i]}</option>)
        return (<div className="DropDown"><div style={{ display: "flex", flexDirection: "row" }}><p className="DropDown">Panel: &nbsp;</p><select value={this.state.panelId}
            onChange={this.handleChange} >
            {options}
            </select></div></div>)
    }
}


export default PanelDropDown;