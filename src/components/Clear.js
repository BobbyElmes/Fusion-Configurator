import React from 'react';
import Bin from '.././Imgs/bin.svg'

//The clear grid button
class Clear extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press(this.props.clear)
    }

    render() {
        if (this.props.mobile)
            return (<div style={{ marginTop: "4%" }}><img onClick={this.handleClick} style={{ width: "90px", cursor: "pointer" }} src={Bin} /></div>)
        else
            return (<div style={{ marginTop: "-30px", marginLeft: "-80px", marginRight: "0" }}><img onClick={this.handleClick} style={{ width: "60px", cursor: "pointer" }} src={Bin} /></div>)
        
    }
}


export default Clear;