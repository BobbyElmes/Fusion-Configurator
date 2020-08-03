import React from 'react';
import Table from 'react-bootstrap/Table';



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
                    <td>{items[0]}</td>
                    <td>{items[4]}</td>
                    <td>{currency[0]}{Math.round(((items[3] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]}</td>
                    <td>{items[1]}</td>
                    <td>{currency[0]}{Math.round(((items[3] * items[1] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]}</td>
                    <td>{Math.round((((items[2] * items[1]) * 0.001) + Number.EPSILON) * 100) / 100   }</td>
                </tr>)
        }
        else {
            return (
                <tr>
                    <td>{items[0]}</td>
                    <td>{items[3]}</td>
                    <td>{currency[0]}{Math.round(((items[2] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]}</td>
                    <td>{items[1]}</td>
                    <td>{currency[0]}{Math.round(((items[2] * items[1] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]}</td>
                </tr>)
        }
    }

}


export default Record;