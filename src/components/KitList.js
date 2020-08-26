import React from 'react';
import KitItem from './KitItem.js'
import { isMobile } from 'react-device-detect';

//displays a column of kit items
class KitList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var list = []
        //create the kit items
        for (var i = 0; i < this.props.items.length; i++) {
            list.push(<KitItem id={this.props.id[i]} item={this.props.items[i]}/>)
        }
        var margin = "140px"
        if (isMobile)
            margin = 0
        //display them in a column
        return (<div style={{ display: "flex", flexDirection: "column", marginRight:margin, marginTop:"20px"}} > {list} </div>)
    }
}


export default KitList;