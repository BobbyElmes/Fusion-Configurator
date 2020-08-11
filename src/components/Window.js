import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'

class Window extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            windowId: 0,
            windows: ["Velux MK08"],
            check:false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            check:!this.state.check
        })
        this.props.press(this.state.windowId)
    }

    handleChange(e) {
        this.setState({
            windowId: e.target.value
        })
    }

    render() {
        var windows = this.state.windows
        var options = []
        var cursor = "pointer"
        var color = "black"
        for (var i = 0; i < windows.length; i++)
            options.push(<option style={{ direction: "rtl" }} value={i}>{windows[i]}</option>)
        if (this.props.landscape == true) {
            this.state.check = false
            cursor = "not-allowed"
            color = "#9e9e9e"
        }
        return (<div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginBottom: "20px" }}><InputGroup.Checkbox style={{ cursor:cursor}} disabled={this.props.landscape} checked={this.state.check} onChange={this.handleClick} />
            <p  style={{ fontFamily: "arial", fontSize: "80%", marginTop: "auto", marginBottom: "auto", marginRight: "5%", marginLeft:"2%",color:color }}>Add a roof window, type</p>
            <select disabled={this.props.landscape} onChange={this.handleChange}>  {options}</select></div>)
    }
}


export default Window;