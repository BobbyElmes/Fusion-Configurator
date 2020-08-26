import React from 'react';
import Clip from '.././Imgs/clipboard.svg'

//Handles the add quote button bottom left of the main grid
class AddQuote extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        if (this.props.total > 0) {
            this.props.press(this.props.expand)
        }
    }

    render() {
        var cursor = "not-allowed"
        if (this.props.total > 0) {
            cursor = "pointer"
        }

        if (this.props.mobile)
            return (<div style={{ marginTop: "4%" }}><img onClick={this.handleClick} style={{ width: "100%", cursor: cursor}} src={Clip} /></div>)
        else
            return (<div style={{ marginTop: "-30px", marginLeft: "-8px", marginRight: "80px" }}><img onClick={this.handleClick} style={{ width: "60px", cursor: cursor }} src={Clip} /></div>)

    }
}


export default AddQuote;