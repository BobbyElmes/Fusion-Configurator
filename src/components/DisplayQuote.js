import React from 'react';
import formatMoney from '.././Functions/FormatMoney.js'
import './Row.css';
import './Cell.css'
import './Fonts.css'
import html2canvas from 'html2canvas';
import Row from './Row.js'
import up from '.././Imgs/increase.svg'
import down from '.././Imgs/decrease.svg'
import bin from '.././Imgs/small_bin.svg'

//This class handles displaying quote information to the screen
//with a item number, mini representation of the panel array, cost per layout, 
//editable number of layouts in the quote, total kwp and price for the layout*number of layouts
//And then finally a total price at the bottom

//Is also used for displaying the quote information from 'NumQuote.js' when the user is about to add
//A layout to the quote list
class DisplayQuote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //number of the quote item
            quantity: 0,
            //whether the image of the quote has been saved (we take)
            //an image of the mini panel representation to be used in the 
            //pdf (I know, it's a bit hacky)
            saved: false,
            //keeps track of which quote item is the one we are operating on
            id: ""
        }
        this.removeClick = this.removeClick.bind(this)
        this.quantityChange = this.quantityChange.bind(this)
        this.saveImg = this.saveImg.bind(this)
        this.saveImages = this.saveImages.bind(this)

    }

    //When the user chooses to remove the quote
    removeClick() {
        this.props.remove(this.props.id -1)
    }

    //When the user changes the number of the quote through the text edit box.
    //We have some type checking here to make sure the total 
    //value is ALWAYS > 0 and a number
    quantityChange(event) {
        var temp = event.target.value
        var value = ""
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].charCodeAt(0) > 47 && temp[i].charCodeAt(0) < 58)
                value += temp[i]
        }
        if ( parseInt(value) < 1 || value == "")
            value = "1"
        
        this.setState({ quantity: parseInt(value) })
        if (this.props.id == null)
            this.props.quantityChange(parseInt(value));
        else
            this.props.quantityChange(parseInt(value),this.props.id);
    }

    //when the button is pressed to change the number of the quote
    quantityButton(x) {
        if (x == 1 || (x == -1 && this.state.quantity > 1)) {
            this.state.quantity = this.state.quantity + x 
            this.props.quantityChange(this.state.quantity,this.props.id);
        }
    }


    //Used to save a picture of the mini panel layout to be used in the PDF 
    //when this quote is first generated
    saveImg() {
        document.body.style.overflow = 'hidden';
        const input = document.getElementById(this.state.id);
        if (input != null) {
            input.focus()
            html2canvas(input, {
                scrollX: 0,
                scrollY: -window.scrollY, //makes sure that the correct pic is taken, even if the window is scrolled
                scale: 5 //Scale for better resolution
            })
                .then((canvas) => {
                    //take the image, then send it through to 'App.js' which can then send it on to 'PDF.js'
                    var data = canvas.toDataURL("image/jpg", 1)
                    this.saveImages(data)
                })
        }
    }

    //When it is first displayed to the screen, take a picture of it
    //For the first quote we wait 2 seconds before taking the picture
    //because otherwise we get some undefined behaviour where it hasn't quite 
    //mounted to the DOM
    componentDidMount() {
        if (this.state.saved == false && this.props.setImages != null) {
            if(this.state.id == "1")
                setTimeout(
                    this.saveImg.bind(this),
                    2000)
            else
                this.saveImg()

            this.state.saved = true
        }
    }

    //Just sends the image file to 'App.js'
    saveImages(blob) {
        this.props.setImages(blob)
        document.body.style.overflow = 'unset';
    }

    

    render() {
        var currency = this.props.currency
        var miniFlash = this.props.miniFlashing
        var miniDisplay = []


        this.state.quantity = this.props.quantity

        //if not the overall summary, then we want to create the mini layout display using 'Row.js'
        if (this.props.id != 0) {
            for (var i = 0; i < miniFlash.length; i++) {
                var marked = []
                for (var c = 0; c < this.props.xSize; c++)
                    marked.push(false)
                if (i == miniFlash.length - 1)
                    var last = true
                if (this.props.mobile)
                    miniDisplay.push(<div style={{ marginTop: 0, marginBottom: 0, fontSize: 0 }}><Row extraSmall={true} ySize={miniFlash.length} last={last} pdf={this.props.pdf} key={i} xSize={this.props.xSize} type={null} flashing={miniFlash[i]} cellPress={null} row={i} down={null} up={null} landscape={this.props.landscape} cellOver={null} marked={marked} /></div>)
                else
                 miniDisplay.push(<div style={{ marginTop: 0, marginBottom: 0, fontSize: 0, minWidth: "100px", maxWidth: "100px" }}><Row ySize={miniFlash.length} last={last} pdf={this.props.pdf} key={i} xSize={this.props.xSize} type={null} flashing={miniFlash[i]} cellPress={null} row={i} down={null} up={null} landscape={this.props.landscape} cellOver={null} marked={marked} /></div>)

            }
        }


        
        var num = 1
        
        if (this.props.popUp)
            var num = this.state.quantity

            //If it's the popUp version, shown when the user has to confirm the layout to be added to the quotes list
            //Then we display things slightly differently to the full quote table
            if (this.props.id != null) {
                this.state.id = this.props.id.toString()
                if (this.props.mobile)
                    var id = <p className="Segoe" style={{ fontSize: "18px",marginTop:"14px", marginRight:"20px" }}>{this.props.id} </p>
                else
                    var id = <p className="Segoe" style={{ fontSize: "18px", marginRight: "30px" }}>{this.props.id} </p>
                if (this.props.mobile)
                    var miniD = <div id={this.state.id} style={{ overflow: "visible", marginRight: "20px" }}>
                        {miniDisplay}
                    </div>
                else
                    var miniD = <div id={this.state.id} style={{ marginLeft: "25px", marginTop: "0px", marginBottom: "10px", minWidth: "105px", maxWidth: "105px", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                        {miniDisplay}
                    </div>
                if (!this.props.mobile) {
                    var left = "50px"
                    var top = "-12px"
                    var size = "20px"
                }
                else {
                    var size = "20px"
                    var top = "0px"
                }
                var removeItem = <img style={{ marginLeft: left, width: size, marginTop: top, cursor: "pointer" }} src={bin} onClick={this.removeClick} />
            }
            else
                var miniD = <div id={this.state.id} style={{ minWidth: "105px", maxWidth: "105px", alignItems: "center", justifyContent: "center", overflow: "visible", marginTop: "-12px" }}>
                    {miniDisplay}
            </div>

            //If not the total row at the bottom of the quotes table, show this, otherwise - show the next one
        if (this.props.id != 0) {
            if (this.props.mobile) {
                if (this.props.id == null)
                    return (<div style={{ marginLeft: "0", overflow: "visible" }}>

                        <div className="horizontal" style={{ alignItems: "center", overflow: "visible" }}>

                            <div style={{ overflow: "visible" }}>
                                {miniD}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "-12.5px", marginTop: "-13px" }}>
                                <img style={{ width: "60px", marginLeft: "-9px", marginBottom: "-5px", cursor: "pointer" }} src={up} onClick={() => this.quantityButton(1)} />
                                <input type="text" style={{ border: "1px solid black", width: "40px", height: "30px", fontFamily: "Sergoe UI Light, arial", fontSize: "14x", marginRight: "-15px", textAlign: "center" }} value={this.state.quantity} onChange={this.quantityChange} />
                                <img style={{ width: "60px", marginLeft: "-9px", marginTop: "-5px", cursor: "pointer" }} src={down} onClick={() => this.quantityButton(-1)} />
                            </div>
                            <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((this.props.total * num) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]} </p>
                            {removeItem}
                        </div>
                    </div>
                    )
                else 
                    return (

                        <div className="horizontal" style={{ alignItems: "center", justifyContent: "center", overflow: "visible",marginLeft:0 }}>
                            {id}
                            <div style={{ overflow: "visible",width: "90px", maxWidth: "90px", minWidth: "90px" }}>
                                {miniD}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "0px",marginRight:"0px" }}>
                                <img style={{ width: "60px", marginLeft: "-9px", marginBottom: "-5px", cursor: "pointer" }} src={up} onClick={() => this.quantityButton(1)} />
                                <input type="text" style={{ border: "1px solid black", width: "40px", height: "30px", fontFamily: "Sergoe UI Light, arial", fontSize: "14x", marginRight: "-15px", textAlign: "center" }} value={this.state.quantity} onChange={this.quantityChange} />
                                <img style={{ width: "60px", marginLeft: "-9px", marginTop: "-5px", cursor: "pointer" }} src={down} onClick={() => this.quantityButton(-1)} />
                            </div>
                            <p className="Segoe" style={{ fontSize: "18px", minWidth: "100px",marginTop:"14px", marginRight:"20px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((this.props.total * num) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]} </p>
                            {removeItem}
                        </div>
                    )
            }
            else {
                return (<div style={{ marginLeft: "0", overflow: "visible" }}>

                    <div className="horizontal" style={{ alignItems: "center", overflow: "visible" }}>
                        {id}
                        <div style={{ overflow: "visible" }}>
                            {miniD}
                        </div>

                        <div style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}><p className="Segoe" style={{ display: "inline-block" }}>{formatMoney((Math.round(((this.props.kwp) + Number.EPSILON) * 100) / 100).toString())} kWp </p></div>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((this.props.total / this.props.quantity * num) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]} </p>
                        <input type="text" style={{ border: "1px solid black", paddingRight: "10px", width: "40px", marginLeft: "40px", marginTop: "-14px", height: "30px", fontFamily: "Sergoe UI Light, arial", fontSize: "14x", textAlignLast: "right" }} value={this.state.quantity} onChange={this.quantityChange} />
                        <div style={{ display: "flex", marginLeft: "0px", flexDirection: "column", marginTop: "-13px" }}>
                            <img style={{ width: "33px", marginBottom: "-11px", cursor: "pointer" }} src={up} onClick={() => this.quantityButton(1)} />
                            <img style={{ width: "33px", marginTop: 0, cursor: "pointer" }} src={down} onClick={() => this.quantityButton(-1)} />
                        </div>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{formatMoney((Math.round(((this.props.kwp * this.state.quantity) + Number.EPSILON) * 100) / 100).toString())} kWp </p>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((this.props.total * num) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]} </p>
                        {removeItem}
                    </div>
                </div>
                )
            }
            }
        else {
            if (this.props.mobile) {
                return (

                    <div className="horizontal" style={{ alignItems: "center", justifyContent: "center" }}>
                        <p className="Segoe" style={{ fontSize: "30px", marginLeft: "0px" }}>{this.props.totalWord.toUpperCase()} </p>

                        <p className="Segoe" style={{ fontSize: "30px", marginLeft: "20px", float: "right", textAlign: "right", minWidth: "100px" }}>{currency[0]}{formatMoney(((Math.round(((this.props.total) + Number.EPSILON) * 100) / 100).toString()), this.props.eur)}{currency[1]}</p>
                    </div>
               )
            }
            else
                return (<div style={{ marginLeft: "0" }}>

                    <div className="horizontal" style={{ alignItems: "center" }}>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "45px" }}>{this.props.totalWord.toUpperCase()} </p>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "275px", float: "right", textAlign: "right", direction: "rtl", minWidth: "100px" }}>{this.props.num}</p>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "62px", float: "right", textAlign: "right", minWidth: "100px" }}>{formatMoney((Math.round(((this.props.kwp) + Number.EPSILON) * 100) / 100).toString())} kWp</p>

                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "21.5px", float: "right", textAlign: "right", minWidth: "100px" }}>{currency[0]}{formatMoney(((Math.round(((this.props.total) + Number.EPSILON) * 100) / 100).toString()), this.props.eur)}{currency[1]}</p>
                    </div>
                </div>)
            }


        return (<div></div>)
    }
}


export default DisplayQuote;