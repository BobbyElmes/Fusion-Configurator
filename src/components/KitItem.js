import React from 'react';
import './Cell.css'
import Button from 'react-bootstrap/Button';

class KitItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }

    }

    decideItem(item) {
        var color = ""
        switch (item) {
            case "F16-TC":
            case "F16-LC":
                color = "TC"
                break;
            case "F16-TR":
            case "F16-LR":
                color = "TR"
                break;
            case "F16-TL":
            case "F16-LL":
                color = "TL"
                break;
            case "F16-TY":
            case "F16-LY":
                color = "TY"
                break;
            case "F16-J":
            case "F16-LJ":
                color = "J"
                break;
            case "VAT-16":
            case "VAL-16":
                color = "VAT-16"
                break;
            case "F16-VC":
                color="Window"
                break;
            case "F16-CLT":
            case "F16-LCLT":
                color = "CLT";
                break;
            case "F16-CRT":
            case "F16-LCRT":
                color = "CRT";
                break;
            case "F16-CRB":
            case "F16-LCRB":
                color = "CRB";
                break;
            case "F16-CLB":
            case "F16-LCLB":
                color = "CLB";
                break;
            case "F16-CLB-S":
            case "F16-LCLB-S":
                color = "CLB-S";
                break;
        }
        return color
    }


    render() {
        var color = this.decideItem(this.props.item[0])

        var cell
        if (color != "") {
            cell = <Button style={{ marginRight: "10px", padding:0, width:"25px", height:"25px" }} className={color + ' shadow-none'}> </Button>
        }

        return (<div style={{ display: "flex", flexDirection: "row", marginBottom: "-10px", minWidth:"130px" }} > {cell} <p style={{ fontFamily: "arial" }}>{this.props.item[0]}</p> <div style={{ position: "absolute", marginLeft: "130px" }}><p style={{ fontFamily: "arial" }}>{this.props.item[1]}</p></div> </div>)
    }
}


export default KitItem;