import React from 'react';
import Button from 'react-bootstrap/Button';
import './Row.css';
import FlashingTable from './Table.js'
import Row from './Row.js'

class DisplayQuote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.removeClick = this.removeClick.bind(this)
    }

    handleClick() {
        this.setState({show: !this.state.show})
    }

    removeClick() {
        this.props.remove(this.props.id -1)
    }

    render() {
        var miniFlash = this.props.miniFlashing
        var miniDisplay = []

        //if not the overall summarry
        if (this.props.id != 0) {
            for (var i = 0; i < miniFlash.length; i++) {
                var marked = []
                for (var c = 0; c < this.props.xSize; c++)
                    marked.push(false)
                miniDisplay.push(<div style={{ marginTop: 0, marginBottom:0, fontSize:0}}><Row key={i} xSize={this.props.xSize} type={null} flashing={miniFlash[i]} cellPress={null} row={i} down={null} up={null} landscape={this.props.landscape} cellOver={null} marked={marked} /></div>)

            }
        }

        
        
        var x = "-"
        //if the overall summary
        if (this.props.id == 0) {
            //if not showing table, else
            if (this.state.show == false) {
                x = "+"
                return (<div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                    <h1>OVERALL</h1>
                    <pre>    </pre>
                    <h1>Cost: {String.fromCharCode('163')}{Math.round(((this.props.total * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100 } </h1>

                </div></div>
                </div> <Button variant="outline-info" onClick={this.handleClick}>{x}</Button> </div>)
            }
            else {
                return (<div>
                    <div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                        <h1>OVERALL</h1>
                        <pre>    </pre>
                        <h1>Cost: {String.fromCharCode('163')}{Math.round(((this.props.total * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100 } </h1>

                    </div></div></div>
                        <Button variant="outline-info" onClick={this.handleClick}>{x}</Button>
                    </div>
                    <FlashingTable components={this.props.flashings[0]} discount={this.props.discount} landscape={false} over={1} />
                    <FlashingTable components={this.props.flashings[1]} packers={this.props.flashings[2]} width={-1} discount={this.props.discount} landscape={true} over={1}  />
                    <FlashingTable panelComponents={this.props.panels} discount={this.props.discount} landscape={false} over={2} total={this.props.total} />
                </div>)
            }
        }
        //if not the overall summary - //if not showing table, else
        else
        if (this.state.show == false) {
            x = "+"
            return (<div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                <h1>Quote {this.props.id} </h1>
                <pre>    </pre>
                <h1>Cost: {String.fromCharCode('163')}{Math.round((((this.props.total + this.props.panelTotal) * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100  } </h1>
                <pre>    </pre>
                <Button variant="outline-info" onClick={this.removeClick}>Remove</Button>
            </div></div>
                <br></br>
                <br></br>
                <div>{miniDisplay}</div>
            </div> 
                <br></br>
                <Button variant="outline-info" onClick={this.handleClick}>{x}</Button>
            </div>)
            }
        else {
            return (<div>
                <div className="layout"><div className="layout"><div className="divForHor"><div className="horizontal">
                <h1>Quote: {this.props.id} </h1>
                <pre>    </pre>
                    <h1>Cost: {String.fromCharCode('163')}{Math.round((((this.props.total + this.props.panelTotal) * (1 - (this.props.discount / 100))) + Number.EPSILON) * 100) / 100 } </h1>
                
                </div></div></div>
                    <Button variant="outline-info" onClick={this.handleClick}>{x}</Button>
                </div>
                <FlashingTable components={this.props.flashings} discount={this.props.discount} landscape={this.props.landscape} panelComponents={this.props.panels} packers={this.props.packers} width={this.props.width} />
                </div>)
        }


        return (<div><Button variant="outline-info" onClick={this.handleClick}>{x}</Button></div>)
    }
}


export default DisplayQuote;