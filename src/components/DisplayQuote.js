import React from 'react';
import Button from 'react-bootstrap/Button';
import formatMoney from '.././Functions/FormatMoney.js'
import './Row.css';
import './Cell.css'
import './Fonts.css'
import html2canvas from 'html2canvas';
import Row from './Row.js'
import up from '.././Imgs/increase.svg'
import down from '.././Imgs/decrease.svg'
import bin from '.././Imgs/bin.svg'


class DisplayQuote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            quantity: 0,
            saved: false,
            id: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.removeClick = this.removeClick.bind(this)
        this.quantityChange = this.quantityChange.bind(this)
        this.saveImg = this.saveImg.bind(this)
        this.saveImages = this.saveImages.bind(this)

    }

    handleClick() {
        this.setState({show: !this.state.show})
    }

    removeClick() {
        this.props.remove(this.props.id -1)
    }

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
        this.props.quantityChange(parseInt(value),this.props.id);
    }

    quantityButton(x) {
        if (x == 1 || (x == -1 && this.state.quantity > 1)) {
            this.state.quantity = this.state.quantity + x 
            this.props.quantityChange(this.state.quantity,this.props.id);
        }
    }



    saveImg() {
        document.body.style.overflow = 'hidden';
        const input = document.getElementById(this.state.id);
        if (input != null) {
            input.focus()
            html2canvas(input, {
                scrollX: 0,
                scrollY: -window.scrollY,
                scale: 5
            })
                .then((canvas) => {

                    var data = canvas.toDataURL("image/jpg", 1)
                    console.log(data)
                    this.saveImages(data)
                    //canvas.toBlob(this.saveImages, "image/png", 1);
                })
        }
    }

    componentDidMount() {
        if (this.state.saved == false && this.props.setImages != null) {
            setTimeout(
                this.saveImg.bind(this),
                200)
            
            this.state.saved = true
        }
    }

    saveImages(blob) {
        
        this.props.setImages(blob)
        document.body.style.overflow = 'unset';
    }

    

    render() {
        var currency = this.props.currency
        var miniFlash = this.props.miniFlashing
        var miniDisplay = []


        //if not the overall summarry
        if (this.props.id != 0) {
            for (var i = 0; i < miniFlash.length; i++) {
                var marked = []
                for (var c = 0; c < this.props.xSize; c++)
                    marked.push(false)
                miniDisplay.push(<div style={{ marginTop: 0, marginBottom: 0, fontSize: 0,minWidth: "100px", maxWidth: "100px"  }}><Row pdf={this.props.pdf} key={i} xSize={this.props.xSize} type={null} flashing={miniFlash[i]} cellPress={null} row={i} down={null} up={null} landscape={this.props.landscape} cellOver={null} marked={marked} /></div>)

            }
        }



        var x = "-"
        //if the overall summary
        /*   if (this.props.id == 0) {
               //if not showing table, else
               if (this.state.show == false) {
                   x = "+"
                   return (<div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                       <h1>OVERALL</h1>
                       <pre>    </pre>
                       <h1>Cost: {currency[0]}{Math.round(((this.props.total * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]} </h1>
   
                   </div></div>
                   </div> <Button variant="outline-info" onClick={this.handleClick}>{x}</Button> </div>)
               }
               else {
                   return (<div>
                       <div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                           <h1>OVERALL</h1>
                           <pre>    </pre>
                           <h1>Cost: {currency[0]}{Math.round(((this.props.total * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100} {currency[1]}</h1>
   
                       </div></div></div>
                           <Button variant="outline-info" onClick={this.handleClick}>{x}</Button>
                       </div>
                       <FlashingTable currency={currency} components={this.props.flashings[0]} discount={this.props.discount} landscape={false} over={1} />
                       <FlashingTable currency={currency} components={this.props.flashings[1]} packers={this.props.flashings[2]} width={-1} discount={this.props.discount} landscape={true} over={1}  />
                       <FlashingTable currency={currency} panelComponents={this.props.panels} discount={this.props.discount} landscape={false} over={2} total={this.props.total} />
                   </div>)
               }
           }*/
        //if not the overall summary - //if not showing table, else
        
        if (this.props.pdf) {
            return (<div id="block" style={{ display:"inline-block" }}>

                <div className="horizontal" style={{ alignItems: "center" }}>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginRight: "30px" }}>{this.props.id} </p>
                    <div id="mini" style={{ marginLeft: "20px", minWidth: "105px", maxWidth: "105px",height:"100%", marginBottom: "10px",marginTop:"0px" }}>
                        {miniDisplay}
                    </div>

                    <div style={{ fontSize: "10px", marginLeft: "25px", minWidth: "50px", float: "right", textAlign: "right" }}><p className="SegoeReg" style={{ display: "inline-block" }}>{formatMoney((Math.round(((this.props.kwp) + Number.EPSILON) * 100) / 100).toString())} kWp </p></div>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "25px", minWidth: "50px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100))) / this.props.quantity) + Number.EPSILON) * 100) / 100).toString())}{currency[1]} </p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "10px", minWidth: "50px", float: "right", textAlign: "right" }}>{this.props.quantity} </p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "25px", minWidth: "50px", float: "right", textAlign: "right" }}>{formatMoney((Math.round(((this.props.kwp * this.props.quantity) + Number.EPSILON) * 100) / 100).toString())} kWp </p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "25px", minWidth: "50px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]} </p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "25px", minWidth: "50px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100)))/(this.props.kwp*1000)) + Number.EPSILON) * 100) / 100).toString())}{currency[1]} /Wp </p>
                </div>
            </div>
            )
        }
        else {
            this.state.id = this.props.id.toString()
            if (this.props.id != 0) {
                //   if (this.state.show == false) {
                //   x = "+"
                //  
                this.state.quantity = this.props.quantity
                return (<div style={{ marginLeft: "0", overflow: "visible" }}>

                    <div className="horizontal" style={{ alignItems: "center", overflow: "visible"}}>
                        <p className="Segoe" style={{ fontSize: "18px", marginRight: "30px" }}>{this.props.id} </p>
                        <div style={{ overflow: "visible" }}>
                            <div id={this.state.id} style={{ marginLeft: "20px", minWidth: "105px", maxWidth: "105px", alignItems: "center", justifyContent: "center", overflow: "visible" }}>
                                    {miniDisplay}
                            </div> </div>

                        <div style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}><p className="Segoe" style={{ display: "inline-block" }}>{formatMoney((Math.round(((this.props.kwp) + Number.EPSILON) * 100) / 100).toString())} kWp </p></div>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100))) / this.props.quantity) + Number.EPSILON) * 100) / 100).toString())}{currency[1]} </p>
                        <input type="text" style={{ border: "1px solid black", paddingRight: "10px", width: "40px", marginLeft: "40px", marginTop: "-14px", height: "30px", fontFamily: "Sergoe UI Light, arial", fontSize: "14x", textAlignLast: "right" }} value={this.state.quantity} onChange={this.quantityChange} />
                        <div style={{ display: "flex", marginLeft: "0px", flexDirection: "column", marginTop: "-13px" }}>
                            <img style={{ width: "33px", marginBottom: "-11px", cursor: "pointer" }} src={up} onClick={() => this.quantityButton(1)} />
                            <img style={{ width: "33px", marginTop: 0, cursor: "pointer" }} src={down} onClick={() => this.quantityButton(-1)} />
                        </div>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{formatMoney((Math.round(((this.props.kwp * this.props.quantity) + Number.EPSILON) * 100) / 100).toString())} kWp </p>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "20px", minWidth: "100px", float: "right", textAlign: "right" }}>{currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]} </p>
                        <img style={{ marginLeft: "50px", width: "40px", marginTop: "-12px", cursor: "pointer" }} src={bin} onClick={this.removeClick} />
                    </div>
                </div>
                )
                //     }
            }
            else {
                return (<div style={{ marginLeft: "0" }}>

                    <div className="horizontal" style={{ alignItems: "center" }}>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "45px" }}>TOTAL </p>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "275px", float: "right", textAlign: "right", direction: "rtl", minWidth: "100px" }}>{this.props.num}</p>
                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "62px", float: "right", textAlign: "right", minWidth: "100px" }}>{formatMoney((Math.round(((this.props.kwp) + Number.EPSILON) * 100) / 100).toString())}kWp</p>

                        <p className="Segoe" style={{ fontSize: "18px", marginLeft: "21.5px", float: "right", textAlign: "right", minWidth: "100px" }}>{currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}</p>
                    </div>
                </div>)
            }
        }
       /* else {
            return (<div>
                <div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                <h1>Quote: {this.props.id} </h1>
                <pre>    </pre>
                    <h1>Cost: {currency[0]}{Math.round((((this.props.total + this.props.panelTotal) * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]} </h1>
                
                </div></div></div>
                    <Button variant="outline-info" onClick={this.handleClick}>{x}</Button>
                </div>
                <FlashingTable currency={currency} components={this.props.flashings} discount={this.props.discount} landscape={this.props.landscape} panelComponents={this.props.panels} packers={this.props.packers} width={this.props.width} />
                </div>)
        }*/


        return (<div></div>)
    }
}


export default DisplayQuote;