import React from 'react';
import snapShot from '.././Imgs/snapshot.svg'


//Handles the orientation button
class Camera extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.press()
    }

    render() {
        return (<img onClick={this.handleClick} src={snapShot} style={{ width: "60px", cursor: "pointer" }} />)
    }
}


export default Camera;