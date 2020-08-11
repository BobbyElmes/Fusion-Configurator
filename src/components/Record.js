import React from 'react';
import './Fonts.css'
import formatMoney from '.././Functions/FormatMoney.js'



class Record extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        //calculating currency (e.g. £30, $40, 500kr)
        
        var items = this.props.items
        var currency = this.props.currency
        //if panel table, else
        if (this.props.panel == true) {
            return (
                <tr>
                    <td style={{ width: "12%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{this.props.id}</p></div></td>
                    <td style={{ width: "36%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{items[4]}</p></div></td>
                    <td style={{ width: "12%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{currency[0]}{formatMoney((Math.round(((items[3] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</p></div></td>
                    <td style={{ width: "15%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{items[1]}</p></div></td>
                    <td style={{ width: "15%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{currency[0]}{formatMoney((Math.round(((items[3] * items[1] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</p></div></td>
                    <td style={{ width: "10%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{formatMoney((Math.round((((items[2] * items[1]) * 0.001) + Number.EPSILON) * 100) / 100).toString())}</p></div></td>
                </tr>)
        }
        else {
            return (
                <tr>
                    <td style={{ width: "15%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{this.props.id}</p></div></td>
                    <td style={{ width: "40%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{items[3]}</p></div></td>
                    <td style={{ width: "15%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{currency[0]}{formatMoney((Math.round(((items[2] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</p></div></td>
                    <td style={{ width: "15%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{items[1]}</p></div></td>
                    <td style={{ width: "15%" }}><div style={{ textAlign: "left" }}><p className="TableSmall">{currency[0]}{formatMoney((Math.round(((items[2] * items[1] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</p></div></td>
                </tr>)
        }
    }

}


export default Record;