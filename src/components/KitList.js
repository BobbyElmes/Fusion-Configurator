import React from 'react';
import KitItem from './KitItem.js'

class KitList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        var list = []
        for (var i = 0; i < this.props.items.length; i++) {
            list.push(<KitItem  item={this.props.items[i]}/>)
        }

        return (<div style={{ display: "flex", flexDirection: "column", marginRight:"140px", marginTop:"20px" }} > {list} </div>)
    }
}


export default KitList;