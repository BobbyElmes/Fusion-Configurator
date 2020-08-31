import React from 'react';
import formatMoney from '.././Functions/FormatMoney.js'
import './DropDown.css'


//Displays the kilowatts-peak for the layout being made at the top left 
//of the grid heading
class KWP extends React.Component {
    constructor(props) {
        super(props)
        
    }


    render() {
        var kwp = (Math.round((this.props.kwp + Number.EPSILON) * 100) / 100).toString()
        var kwp = formatMoney(kwp, this.props.eur)
        if (this.props.mobile)
            return (<p style={{ color: "white", marginLeft: "5px", marginTop: "10px", width: "30%", fontSize: "125%", fontFamily: "arial", textAlign:"left" }}>{kwp} kWp</p>)
        else
            return (<p style={{ color:"white", marginLeft:"15px", marginTop:"-5px",width:"150px", fontSize: "150%", fontFamily: "arial"}}>{kwp} kWp</p>)
    }
}


export default KWP;