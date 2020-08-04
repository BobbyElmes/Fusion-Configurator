import React from 'react';
import Button from 'react-bootstrap/Button';
import Bin from '.././Imgs/bin.svg'

class Clear extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.clear)
    }

    render() {
        var x = "CLEAR CELLS"
        return (<div style={{ marginTop: "-30px",marginLeft: "-80px", marginRight: "0" }}><img onClick={this.handleClick} style={{ width: "40%" }} src={Bin} /></div>)
    }
}


export default Clear;