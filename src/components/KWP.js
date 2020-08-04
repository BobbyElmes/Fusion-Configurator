import React from 'react';
import formatMoney from './FormatMoney.js'
import './DropDown.css'


//handles the panel drop down menu
class KWP extends React.Component {
    constructor(props) {
        super(props)
        
    }


    render() {
        var kwp = (Math.round((this.props.kwp + Number.EPSILON) * 100) / 100).toString()
        var kwp = formatMoney(kwp)
        return (<p style={{ color:"white", marginLeft:"2%", marginTop:"0.5%", fontSize: "150%", fontFamily: "arial"}}>{kwp} kWp</p>)
    }
}


export default KWP;