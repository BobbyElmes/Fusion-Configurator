import React from 'react';
import formatMoney from '.././Functions/FormatMoney.js'

//Handles the discount box, under the title of the page
class Discount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            discount: 0,
            focus: false
        };
        this.onDiscountChange = this.onDiscountChange.bind(this)
        this.setDiscount = this.setDiscount.bind(this)
        this.focus = this.focus.bind(this)

    }

    //We do some checks to make sure it's a valid number between 0 and 100 (inclusive)
    onDiscountChange(event) {
        var val = event.target.value
        var rawVal = ""
        for (var i = 0; i < val.length; i++) {
            if (val[i] == "%")
                break;
            rawVal += val[i]
        }
        this.setState({ discount: (rawVal) })

    }

    setDiscount(event) {
        var val = event.target.value
        var rawVal = ""
        for (var i = 0; i < val.length; i++) {
            
            if (val[i] == "%")
                break;

            if (val[i] == ",")
                rawVal += "."
            else
                rawVal += val[i]
        }
        var val = parseFloat(rawVal);
        var value = 0
        if (!isNaN(val)) {
            if (val > 0 && val <= 100)
                value = val
        }

        

        this.setState({
            discount: (value),
            focus:false})
        this.props.discount(parseFloat(value));

    }

    focus() {
        this.setState({
            focus:true
        })
    }


    render() {
        if (this.state.focus) {
            var disVal = this.state.discount
        }
        else {
            var disVal = this.state.discount.toString() + "%"
        }
        if (this.props.mobile) {
            return (
                <label style={{ display: "flex", flexShrink: "0", flexDirection: "row", marginTop:"50px",marginLeft:"5%",marginBottom:"20px" }}>
                    <input type="text" style={{ width: "50px", height: "80%", fontFamily: "arial", fontSize: "80%", textAlignLast: "right" }} value={disVal} onBlur={this.setDiscount} onFocusOut={this.setDiscount} onFocus={this.focus} onChange={this.onDiscountChange} />
                    <p style={{ fontFamily: "arial", fontSize: "80%" }}>&nbsp;&nbsp;{this.props.disWord}</p>
                </label>
            )
        }
        else
            return (
                <label style={{ display: "flex", flexShrink: "0", flexDirection: "row", marginTop: "30px", marginBottom:"10px"}}>
                    <input type="text" style={{ width: "50px", height: "80%", fontFamily: "arial", fontSize: "80%", textAlignLast: "right" }} value={disVal} onBlur={this.setDiscount} onFocusOut={this.setDiscount} onFocus={this.focus} onChange={this.onDiscountChange} />
                    <p style={{ fontFamily: "arial", fontSize: "80%" }}>&nbsp;&nbsp;{this.props.disWord}</p>
                    </label>
             )
    }
}


export default Discount;