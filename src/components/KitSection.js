import React from 'react';
import KitList from './KitList.js'
import { isMobile } from 'react-device-detect';

class KitSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    render() {
        var flash = this.props.flashings
        var land = this.props.landscape
        var ids = this.props.ids
        var reg = []
        var regID = []
        var corner = []
        var cornerID=[]
        var vc = []
        var vcID = []

        var flashID = 0
        if (land)
            flashID = 1
        for (var i = 0; i < flash.length; i++) {
            if (i < 6) {
                reg.push(flash[i])
                regID.push(ids[flashID][i])
            }
            else {
                if (i < 11) {
                    corner.push(flash[i])
                    cornerID.push(ids[flashID][i])
                }
                else {
                    vc.push(flash[i])
                    vcID.push(ids[flashID][i])
                }
            }
        }

        var pack = this.props.packers 
        var ppb = []
        var ppbID = []
        var SB = []
        var SBID = []
        for (var i = 0; i < pack.length; i++) {
            if (i < 4) {
                ppb.push(pack[i])
                ppbID.push(ids[2][i])
            }
            else {
                SB.push(pack[i])
                SBID.push(ids[2][i])
            }
        }


        if (!isMobile) {
            var items = [[], []]
            items[0].push(<KitList id={regID} items={reg} />)
            items[0].push(<KitList id={cornerID} items={corner} />)
            if (vc != null) {
                if (!this.checkEmpty(vc))
                    items[0].push(< KitList id={vcID} items={vc} />)
            }
            if (!this.checkEmpty(ppb))
                items[1].push(<div><KitList id={ppbID} items={ppb} /><p style={{ fontFamily: "arial" }}>20 pieces per box</p></div>)
            if (!this.checkEmpty(SB))
                items[1].push(<KitList id={SBID} items={SB} />)
        }
        else {
            var items = [[], [],[],[],[]]
            items[0].push(<KitList id={regID} items={reg} />)
            items[1].push(<KitList id={cornerID} items={corner} />)
            if (vc != null) {
                if (!this.checkEmpty(vc))
                    items[2].push(< KitList id={vcID} items={vc} />)
            }
            if (!this.checkEmpty(ppb))
                items[3].push(<div><KitList id={ppbID} items={ppb} /><p style={{ fontFamily: "arial" }}>20 pieces per box</p></div>)
            if (!this.checkEmpty(SB))
                items[4].push(<KitList id={SBID} items={SB} />)
        }


        

        return (<div style={{ display: "flex", flexDirection: "column" }} >
            <h1 style={{ fontFamily: "Segoe UI Light", fontSize:"35px"}}>Kit List</h1>
            <div style={{ display: "flex", flexDirection: "row" }} >{items[0]}  </div>
            <div style={{ display: "flex", flexDirection: "row" }} >{items[1]}   </div>
        </div>)
    }

    checkEmpty(list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][1] != 0)
                return false
        }
        return true
    }
}


export default KitSection;