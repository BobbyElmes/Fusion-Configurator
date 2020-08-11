import React from 'react';
import './PricePerWatt.css'
import formatMoney from '.././Functions/FormatMoney.js'

class PricePerWatt extends React.Component {
    constructor(props) {
        super(props)

    }

    formatNumber(formattedTotal) {
        var numDP = 0
        var foundDot = false
        for (var i = formattedTotal.length; i >= 0; i--) {
            if (formattedTotal[i] == '.') {
                foundDot = true
                break;
            }
            numDP++;
        }
        if (numDP == 0 || foundDot == false)
            formattedTotal += ".00"
        else {
            if (numDP == 1)
                formattedTotal += "0"
        }
        return formattedTotal
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
        var formattedTotal = (Math.round((total + Number.EPSILON) * 100) / 100).toString()
        var formattedPPW = (Math.round((ppw + Number.EPSILON) * 100) / 100).toString()
        formattedPPW = formatMoney(formattedPPW)
        formattedTotal = formatMoney(formattedTotal)

        return (
            <div style={{ margin: "auto", textAlign: "center" }}>
                <p className="PPWtext" style={{ fontFamily: "arial",fontSize: "150%",  marginTop:"3px", marginBottom:"3px" }}>{this.props.currency[0]}{formattedTotal}{this.props.currency[1]}</p>
                <p className="PPWtext" style={{ fontFamily: "arial", fontSize: "75%", marginTop: "0%", marginBottom: "10px" }}>{this.props.currency[0]}{formattedPPW}{this.props.currency[1]} P/W </p>
            </div>
                )
    }
}


export default PricePerWatt;