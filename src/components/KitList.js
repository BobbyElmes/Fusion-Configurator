import React from 'react';
import KitItem from './KitItem.js'
import { isMobile } from 'react-device-detect';

class KitList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        var list = []
        for (var i = 0; i < this.props.items.length; i++) {
            list.push(<KitItem id={this.props.id[i]} item={this.props.items[i]}/>)
        }
        var margin = "140px"
        if (isMobile)
            margin = 0
        return (<div style={{ display: "flex", flexDirection: "column", marginRight:margin, marginTop:"20px" }} > {list} </div>)
    }
}


export default KitList;