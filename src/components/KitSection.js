import React from 'react';
import KitList from './KitList.js'

class KitSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        var flash = this.props.flashings
        var land = this.props.landscape
        var reg = []
        var corner = []
        var vc = []
        for (var i = 0; i < flash.length; i++) {
            if (i < 6)
                reg.push(flash[i])
            else {
                if (i < 11)
                    corner.push(flash[i])
                else
                    vc.push(flash[i])
            }
        }

        var pack = this.props.packers 
        var ppb = []
        var SB = []
        for (var i = 0; i < pack.length; i++) {
            if (i < 4)
                ppb.push(pack[i])
            else {
                SB.push(pack[i])
            }
        }

        var items = [[],[]]
        items[0].push(<KitList items={reg} />)
        items[0].push(<KitList items={corner} />)
        if (vc != null)
            items[0].push (< KitList items = { vc } />)
        items[1].push(<div><KitList items={ppb} /><p style={{ fontFamily: "arial" }}>20 pieces per box</p></div>)
        items[1].push(<KitList items={SB} />)
        

        return (<div style={{ display: "flex", flexDirection: "column" }} >
            <h1 style={{ fontFamily: "Segoe UI Light", fontSize:"35px"}}>Kit List</h1>
            <div style={{ display: "flex", flexDirection: "row" }} >{items[0]}  </div>
            <div style={{ display: "flex", flexDirection: "row" }} >{items[1]}   </div>
        </div>)
    }
}


export default KitSection;