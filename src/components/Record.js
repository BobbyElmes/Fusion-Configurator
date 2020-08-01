import React from 'react';
import Table from 'react-bootstrap/Table';



class Record extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        var items = this.props.items
        //if panel table, else
        if (this.props.panel == true) {
            return (
                <tr>
                    <td>{items[0]}</td>
                    <td>{String.fromCharCode('163')}{Math.round(((items[3] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}</td>
                    <td>{items[1]}</td>
                    <td>{String.fromCharCode('163')}{Math.round(((items[3] * items[1] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100   }</td>
                    <td>{Math.round((((items[2] * items[1]) * 0.001) + Number.EPSILON) * 100) / 100   }</td>
                </tr>)
        }
        else {
            return (
                <tr>
                    <td>{items[0]}</td>
                    <td>{items[3]}</td>
                    <td>{String.fromCharCode('163')}{Math.round(((items[2] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100 }</td>
                    <td>{items[1]}</td>
                    <td>{String.fromCharCode('163')}{Math.round(((items[2] * items[1] * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100 }</td>
                </tr>)
        }
    }

}


export default Record;