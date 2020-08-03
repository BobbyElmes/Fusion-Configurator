import React from 'react';

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

        return (
            <p>PRICE PER WATT: {this.props.currency[0]}{Math.round((ppw + Number.EPSILON) * 100) / 100}{this.props.currency[1]}</p>
        )
    }
}


export default PricePerWatt;