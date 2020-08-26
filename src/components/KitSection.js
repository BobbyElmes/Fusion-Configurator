import React from 'react';
import KitList from './KitList.js'
import { isMobile } from 'react-device-detect';
import html2canvas from 'html2canvas';
import snapShot from '.././Imgs/snapshot.svg'
import Modal from 'react-modal';

//This class is responsible for displaying the whole 'kit list' section of the webpage
//It creates individual 'Kit Lists' and builds them into the full section
class KitSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //whether or not to show the 'copied kit list to clipboard' popup
            showPopUp: false,
            //used to decide how much of the kit list is screenshotted
            id: "kitList"
        }

        this.popUpClose = this.popUpClose.bind(this)
        this.copy = this.copy.bind(this)
        this.copyToClipboard = this.copyToClipboard.bind(this)
        this.sectionRef = React.createRef();
    }

    //takes a png, copies it to the clipboard
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

    //Closes the 'copied kit list to clipboard' popup 1 second
    //after it is shown
    popUpClose() {
        setTimeout(function () {
            this.setState({
                showPopUp: false
            })
        }.bind(this),1000)
    }

    //Takes a screenshot of the kit list 
    copy() {
        const input = document.getElementById("kitList");

        if (this.state.id == "reg")
            var width = 150
        else {
            if (this.state.id == "corner")
                var width = 440
            else
                width = 685
        }
        var xstart = window.innerWidth*0.1
        console.log(this.state.id)
        html2canvas(input, {
            scrollX: 0,
            scrollY: -window.scrollY, //this is a little hack because it needs to think the scollbar is at the top
            x: xstart,
            width: width,
            scale: 5 //this gives it higher resolution than say, 1
        })
            .then((canvas) => {
                //copy to clipboard
                canvas.toBlob(this.copyToClipboard, "image/jpg", 1);
            })
    }

    //render the kit section
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
        //push TLs, TRs ect to one kit list, then CLTs CRTs to another, then the VC
        for (var i = 0; i < flash.length; i++) {
            if (i < 6) {
                reg.push(flash[i])
                regID.push(ids[flashID][i])
            }
            else {
                if (i < 11) {
                    if (flash[i][1] > 0)
                        var id = "corner"
                    corner.push(flash[i])
                    cornerID.push(ids[flashID][i])
                }
                else {
                    vc.push(flash[i])
                    vcID.push(ids[flashID][i])
                }
            }
        }

        //Do the same for the SPs and the SB16s
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
        var id = "reg"

        //for mobile we want the kit lists to be in a column
        //for desktop we want 2 rows
        if (!isMobile) {
            var items = [[], []]
            items[0].push(<KitList id={regID} items={reg} />)
            items[0].push(<KitList id={cornerID} items={corner} />)
            if (!this.checkEmpty(corner))
                id = "corner"
            if (vc != null) {
                if (!this.checkEmpty(vc)) {
                    items[0].push(< KitList id={vcID} items={vc} />)
                    id = "kitList"
                }
            }
            if (!this.checkEmpty(ppb)) {
                items[1].push(<div><KitList id={ppbID} items={ppb} /><p style={{ fontFamily: "arial" }}>20 pieces per box</p></div>)
            }
            if (!this.checkEmpty(SB)) {
                items[1].push(<KitList id={SBID} items={SB} />)
            }
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

        this.state.id = id
        var panels = []

        //add the current panel, and number of said panel to the lists
        panels.push(this.props.panels[this.props.panel])
        var panelID = [ids[3][this.props.panel]]
        panelID.push()
        var panelItem = []
        panelItem.push(<KitList id={panelID} items={panels} />)

        //display the lists
        return (<div ><img onClick={this.copy} src={snapShot} style={{ width: "60px", marginBottom: "-50px", marginLeft: "820px", cursor: "pointer" }} /><div id="kitList" style={{ display: "flex", flexDirection: "column", maxWidth: "685px" }} >
            
            <div style={{ display: "flex", flexDirection: "row" }} >{panelItem}</div>
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
                        {this.props.popUpText}
                    </p>        
                </div>
            </Modal></div>)
    }

    //checks if the current product list has any items with more than 0 needed for the current layout
    //this is required so that if for example there are no VCs then we don't display it in this section
    checkEmpty(list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i][1] != 0)
                return false
        }
        return true
    }
}


export default KitSection;