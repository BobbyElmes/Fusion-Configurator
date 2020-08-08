import React from 'react';
import Cell from './Cell.js'
import './Row.css';
import Expand from './Expand.js'
import Arrow from '.././Imgs/Arrow.png'
import Button from 'react-bootstrap/Button';


class Row extends React.Component {
    constructor(props) {
        super(props)
        this.cellClick = this.cellClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClick2 = this.handleClick2.bind(this)

        this.state = {
            value: this.props.type
        }
    }

    //when the cell is clicked, trigger cell press in parent class
    cellClick(x,y) {
        this.props.cellPress(x, y)
    }
    

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type || prevProps.flashing !== this.props.flashing) {
            this.setState({ value: this.props.type});
        }
    }

    handleClick() {
        this.props.expandPress(0)
    }

    handleClick2() {
        this.props.expandPress(1)
    }

    //displays a row of cells horizontally
    render() {
        var cellRow = []
        var expand = [0,0]
        if (this.props.ySize % 2) {
            expand[0] = Math.floor(this.props.ySize / 2) 
            expand[1] = Math.floor(this.props.ySize / 2) +1
        } else {
            expand[0] = Math.floor(this.props.ySize / 2) -1
            expand[1] = Math.floor(this.props.ySize / 2) 
        }

        var st
        for (var i = 0; i < this.props.xSize; i++) {
            if (this.props.type == null)
                cellRow.push(<Cell key={i} style={{ marginRight:st}} type={false} press={this.cellClick} flashing={this.props.flashing[i]} row={this.props.row} column={i} down={this.props.down} up={this.props.up} landscape={this.props.landscape} cellOver={this.props.cellOver} marked={this.props.marked[i]} pdf={this.props.pdf} />)
            else
                cellRow.push(<Cell key={i} type={this.props.type[i]} press={this.cellClick} flashing={this.props.flashing[i]} row={this.props.row} column={i} down={this.props.down} up={this.props.up} landscape={this.props.landscape} cellOver={this.props.cellOver} marked={this.props.marked[i]} />)
        }

        var x = null
        if (this.props.ySize != null) {
            if (this.props.row == expand[0]) {
                x = <div className="button2" style={{ display: "flex", flexDirection: "row", flexShrink: "0", marginTop: "10px" }}> <div style={{ marginRight: "200%" }}></div><Button className="button" onClick={this.handleClick} style={{ position: "absolute", marginTop: "-10px", marginLeft: "2%", width: "40px", height: "40px" }}><img src={Arrow} className="button2" style={{ position: "absolute", marginLeft: "-50%", marginTop: "-50%", width: "40px", height: "40px", padding: "10px" }} /></Button></div>
            }
            else {
                if (this.props.row == expand[1]) {
                    x = <div className="button2" style={{ display: "flex", flexDirection: "row", flexShrink: "0", marginTop: "10px" }}> <div style={{ marginRight: "200%" }}></div><Button className="button" onClick={this.handleClick2} style={{ position: "absolute", marginTop: "5px", marginLeft: "2%", width: "40px", height: "40px" }}><img src={Arrow} style={{ transform: "rotate(180deg)", position: "absolute", marginLeft: "-50%", marginTop: "-50%", width: "40px", height: "40px", padding: "10px" }} /></Button></div>
                }
            }

        }

        

        return (<div className="horizontal">{cellRow}{x}</div>)
    }
}


export default Row;