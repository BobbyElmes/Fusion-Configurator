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
        var kwp = formatMoney(kwp)
        return (<p style={{ color:"white", marginLeft:"15px", marginTop:"-5px",width:"150px", fontSize: "150%", fontFamily: "arial"}}>{kwp} kWp</p>)
    }
}


export default KWP;