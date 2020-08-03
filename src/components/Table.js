import React from 'react';
import Table from 'react-bootstrap/Table';
import Record from './Record.js'
import PanelList from './PanelList.js'



class FlashingTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.components
        }


    }

    componentDidUpdate(prevProps) {
        if (prevProps.components !== this.props.components) {
            this.setState({ value: this.props.components });
        }
    }

    render() {
        var tableComponents = this.props.components
        var panelComponents = this.props.panelComponents
        var record = []
        var totalPrice = 0
        var currency = this.props.currency

        //calculate flashing table to render
        var flashTab
        if (tableComponents != null) {
            for (var i = 0; i < tableComponents.length; i++) {
                record.push(<Record currency={currency} items={tableComponents[i]} discount={this.props.discount} landscape={this.props.landscape} />)
                totalPrice += tableComponents[i][2] * tableComponents[i][1]
            }
            if (this.props.over == 2) {
                totalPrice = this.props.total

            }

            flashTab = <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Flashing Kit</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {record}
                </tbody>
            </Table>
        }

        //calculate panel table to render
        var panelTab
        if (panelComponents != null) {
            var panels = []
            var panelTotal = 0
            for (var i = 0; i < panelComponents.length; i++) {
                panels.push(<Record currency={currency} items={panelComponents[i]} discount={this.props.discount} landscape={this.props.landscape} panel={true} />)
                totalPrice += panelComponents[i][3] * panelComponents[i][1]
            }

            panelTab = <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Panel</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                        <th>kWp</th>
                    </tr>
                </thead>
                <tbody>
                    {panels}
                </tbody>
            </Table>
        }


        
        var packers = this.props.packers
        var width = this.props.width
        var packerTab
        if (packers != null) {
            if (width > 25 || width==-1) {
                var SP = []
                for (var i = 0; i < 2; i++) {
                    SP.push(<Record currency={currency} items={packers[i]} discount={this.props.discount} landscape={this.props.landscape} />)
                    totalPrice += packers[i][2] * packers[i][1]
                }
            }
            if (width == 22 || width == -1) {
                var B = []
                for (var i = 2; i < 4; i++) {
                    B.push(<Record currency={currency} items={packers[i]} discount={this.props.discount} landscape={this.props.landscape} />)
                    totalPrice += packers[i][2] * packers[i][1]
                }
            }
            if (width == 0 || width == -1) {
                var SB = []
                    for (var i = 4; i < 11; i++) {
                        SB.push(<Record currency={currency} items={packers[i]} discount={this.props.discount} landscape={this.props.landscape} />)
                        totalPrice += packers[i][2] * packers[i][1]
                    }
            }
            
            if (width != 25) {
                packerTab = <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SP}
                        {B}
                        {SB}
                    </tbody>
                </Table>
            }
        }

        if (this.props.total != null)
            totalPrice = this.props.total

        //total price table to render
        var totTab = <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                <td>Total Price: </td>
                <td>{currency[0]}{Math.round(((totalPrice * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100}{currency[1]}</td>
            </tbody>
        </Table>

        if (this.props.over == 1)
            totTab = null
                

        //render all 3 tables
        return (<div >
            {flashTab}
            {panelTab}
            {packerTab}
            {totTab}
            </div>)
    }


}


export default FlashingTable;