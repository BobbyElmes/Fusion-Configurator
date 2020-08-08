import React from 'react';
import Button from 'react-bootstrap/Button';
import Clip from '.././Imgs/clipboard.svg'

class AddQuote extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.expand)
    }

    render() {
        return (<div style={{ marginTop:"-30px" ,marginLeft: "-8px", marginRight: "80px" }}><img onClick={this.handleClick} style={{ width:"60px" }} src={Clip} /></div>)
    }
}


export default AddQuote;