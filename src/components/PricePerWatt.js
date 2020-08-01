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
            watts += panels[i][1] * panels[i][3]
        }
        var ppw = 0
        if (watts != 0)
            ppw = (total / watts)

        return (
            <p>PRICE PER WATT: {String.fromCharCode('163')}{Math.round((ppw + Number.EPSILON) * 100) / 100 }</p>
        )
    }
}


export default PricePerWatt;