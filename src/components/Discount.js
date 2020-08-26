import React from 'react';

//Handles the discount box, under the title of the page
class Discount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            discount:0
        };
        this.onDiscountChange = this.onDiscountChange.bind(this)

    }

    //We do some checks to make sure it's a valid number between 0 and 100 (inclusive)
    onDiscountChange(event) {
        var temp = event.target.value
            var value = ""
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].charCodeAt(0) > 47 && temp[i].charCodeAt(0) < 58)
                    value += temp[i]

            }
            if (parseInt(value) > 100 || parseInt(value) < 0 || value == "")
                value = "0"
            this.setState({ discount: parseInt(value) })
            this.props.discount(parseInt(value));
    }


    render() {
        return (
            <label style={{ display: "flex", flexShrink: "0", flexDirection: "row"}}>
                <input type="text" style={{ width: "50px",height:"80%", fontFamily: "arial", fontSize: "80%", textAlignLast: "right"}} value={this.state.discount + "%"} onChange={this.onDiscountChange} />
                <p style={{ fontFamily: "arial", fontSize: "80%" }}>&nbsp;&nbsp;{this.props.disWord}</p>
                </label>
         )
    }
}


export default Discount;