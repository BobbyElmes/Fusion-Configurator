import React from 'react';
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
        if (this.props.mobile)
            return (<div style={{ marginTop: "4%" }}><img onClick={this.handleClick} style={{ width: "100%", cursor: "pointer" }} src={Bin} /></div>)
        else
            return (<div style={{ marginTop: "-30px", marginLeft: "-80px", marginRight: "0" }}><img onClick={this.handleClick} style={{ width: "60px", cursor: "pointer" }} src={Bin} /></div>)
        
    }
}


export default Clear;