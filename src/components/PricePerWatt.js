import React from 'react';
import './PricePerWatt.css'
import formatMoney from '.././Functions/FormatMoney.js'

//Displays the price per watt and total price for the current layout being made
class PricePerWatt extends React.Component {
    constructor(props) {
        super(props)

    }

   
    render() {
        var panels = this.props.panels
        var total = this.props.total
        var watts = 0
        for (var i = 0; i < panels.length; i++) {
            watts += panels[i][1] * panels[i][2]
        }
        var ppw = 0
        if (watts != 0)
            ppw = (total / watts)

        //We've got to format these numbers so they can be in a £xx,xxx.xx format, so we use the 'formatMoney' function I used
        var formattedTotal = (Math.round((total + Number.EPSILON) * 100) / 100).toString()
        var formattedPPW = (Math.round((ppw + Number.EPSILON) * 100) / 100).toString()
        formattedPPW = formatMoney(formattedPPW, this.props.eur)
        formattedTotal = formatMoney(formattedTotal, this.props.eur)

        return (
            <div style={{ margin: "auto", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                <p className="PPWtext" style={{ fontFamily: "arial",fontSize: "150%",  marginTop:"5px", marginBottom:"3px" }}>{this.props.currency[0]}{formattedTotal}{this.props.currency[1]}</p>
                <p className="PPWtext" style={{ fontFamily: "arial", fontSize: "75%", marginTop: "0%", marginBottom: "10px" }}>{this.props.currency[0]}{formattedPPW}{this.props.currency[1]} /Wp </p>
            </div>
                )
    }
}


export default PricePerWatt;