import React from 'react';
import Button from 'react-bootstrap/Button'
import PanelList from './PanelList.js'

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
            options.push(<option value={i}>{widths[i]}</option>)
        return (<div><p>Width (mm): </p><select value={this.state.panelId}
            onChange={this.handleChange} >
            {options}
        </select></div>)
    }
}


export default PackerDropDown;