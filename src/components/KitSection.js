import React from 'react';
import KitList from './KitList.js'
import { isMobile } from 'react-device-detect';
import html2canvas from 'html2canvas';
import snapShot from '.././Imgs/snapshot.svg'
import Modal from 'react-modal';

class KitSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopUp: false
        }

        this.popUpClose = this.popUpClose.bind(this)
        this.copy = this.copy.bind(this)
        this.copyToClipboard = this.copyToClipboard.bind(this)
        this.sectionRef = React.createRef();
    }

    copyToClipboard = async (pngBlob) => {
        try {
            await navigator.clipboard.write([
                // eslint-disable-next-line no-undef
                new ClipboardItem({
                    [pngBlob.type]: pngBlob
                })
            ]);
            console.log("Image copied");
            this.setState({
                showPopUp: true
            }, () => { this.popUpClose()});
        } catch (error) {
            console.error(error);
        }
    };

    popUpClose() {
        setTimeout(function () {
            this.setState({
                showPopUp: false
            })
        }.bind(this),1000)
    }

    copy() {
        const input = document.getElementById('kitList');
       // input.focus()
        
        html2canvas(input, {
            scrollX: 0,
            scrollY: -window.scrollY,
            scale: 2
        })
            .then((canvas) => {
                canvas.toBlob(this.copyToClipboard, "image/png", 1);
            })
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

        var panels = []
        panels.push(this.props.panels[this.props.panel])
        var panelID = [ids[3][this.props.panel]]
        panelID.push()
        var panelItem = []
        panelItem.push(<KitList id={panelID} items={panels} />)

        return (<section  ><img onClick={this.copy} src={snapShot} style={{ width: "60px", marginBottom: "-50px", marginLeft: "820px", cursor: "pointer" }} /><div id="kitList" style={{ display: "flex", flexDirection: "column", width:"725px" }} >
            <div style={{ display: "flex", flexDirection: "row"}} >{panelItem}</div>
            <div style={{ display: "flex", flexDirection: "row" }} >{items[0]}  </div>
            <div style={{ display: "flex", flexDirection: "row" }} >{items[1]}   </div>
            
        </div>
            <Modal
            isOpen={this.state.showPopUp}
                contentLabel="Kit List"
                ariaHideApp={false}
            style={{ position: "absolute", top: "50vw", left: "50%", overlay: { zIndex: 1000, height: "200px",width:"400px",top:"25vh", bottom: "25vh", right: "40vw", left: "40vw" } }}>
                <div className="popUp" >
                    <p>
                Kit List Copied to Clipboard
                    </p>        
                </div>
            </Modal></section>)
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