import React from 'react';
import Cell from './Cell.js'
import './Row.css';
import Arrow from '.././Imgs/Arrow.png'
import Button from 'react-bootstrap/Button';

//Handles one row of panel cells when the panel layout is displayed
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
        if (this.props.up == null)
            cellRow.push(<div style={{ width: "1px", background: "black" }}></div>)
        for (var i = 0; i < this.props.xSize; i++) {
            var cursor
            //some logic to decide what the cursor should be if we have the window box checked
            if (this.props.wind) {
                if(this.props.unblock[2] == false)
                    cursor = "not-allowed"
                else
                    cursor = "pointer"
                if (this.props.row == this.props.unblock[0] && i == this.props.unblock[1])
                    cursor = "pointer"
            } else
                cursor = "pointer"
            //Add the cell
            if (this.props.type == null)
                cellRow.push(<Cell key={i} pdf={this.props.pdf} ySize={this.props.ySize} xSize={this.props.xSize} mobile={this.props.mobile} style={{ marginRight: st }} window={this.props.window} cursor={cursor} type={false} press={this.cellClick} flashing={this.props.flashing[i]} row={this.props.row} column={i} down={this.props.down} up={this.props.up} landscape={this.props.landscape} cellOver={this.props.cellOver} marked={this.props.marked[i]} pdf={this.props.pdf} />)
            else
                cellRow.push(<Cell key={i} pdf={this.props.pdf} ySize={this.props.ySize} xSize={this.props.xSize} mobile={this.props.mobile} type={this.props.type[i]} window={this.props.window} cursor={cursor} press={this.cellClick} flashing={this.props.flashing[i]} row={this.props.row} column={i} down={this.props.down} up={this.props.up} landscape={this.props.landscape} cellOver={this.props.cellOver} marked={this.props.marked[i]} />)
            if (this.props.up == null)
                cellRow.push(<div style={{ width: "1px", background: "black" }}></div>)
        }

        var x = null
        //Here we display the arrows at the side of the grid, if we're on the correct row
        if (this.props.up != null && this.props.mobile != true) {
            if (this.props.row == expand[0]) {
                x = <div className="button2" style={{ display: "flex", flexDirection: "row", flexShrink: "0", marginTop: "10px" }}> <div style={{ marginRight: "200%" }}></div><Button disabled={!this.props.showArrow[1]} className="button" onClick={this.handleClick} style={{ position: "absolute", marginTop: "-10px", marginLeft: "2%", width: "40px", height: "40px" }}><img src={Arrow} className="button2" style={{ position: "absolute", marginLeft: "-50%", marginTop: "-50%", width: "40px", height: "40px", padding: "10px" }} /></Button></div>
            }
            else {
                if (this.props.row == expand[1]) {
                    x = <div className="button2" style={{ display: "flex", flexDirection: "row", flexShrink: "0", marginTop: "10px" }}> <div style={{ marginRight: "200%" }}></div><Button disabled={!this.props.showArrow[0]} className="button" onClick={this.handleClick2} style={{ position: "absolute", marginTop: "5px", marginLeft: "2%", width: "40px", height: "40px" }}><img src={Arrow} style={{ transform: "rotate(180deg)", position: "absolute", marginLeft: "-50%", marginTop: "-50%", width: "40px", height: "40px", padding: "10px" }} /></Button></div>
                }
            }

        }

        var margin = "0"
       
        //If displaying the mini panel layout, we do things a bit differently to try and keep
        //The margins between borders thin and equal due to issues with sizing
        if (this.props.up == null) {
            if (this.props.last) {
                //This css is a bit horrible but it works
                var newRow = <div style={{}}> <div style={{ height: "1px", background: "black", zIndex: 100 }}></div> <div className="horizontal" style={{ marginTop: margin, marginBottom: margin }}>{cellRow}{x}</div><div style={{ height: "1px", background: "black", zIndex: 100 }}></div> </div >
                return (<div><div className="horizontal" style={{ marginTop: margin, marginBottom: margin }}>{newRow}{x}</div></div>)
            }
            else {
                var newRow = <div style={{}}> <div style={{ height: "1px", background: "black", zIndex: 100 }}></div> <div className="horizontal" style={{ marginTop: margin, marginBottom: margin }}>{cellRow}{x}</div> </div >
                return (<div><div className="horizontal" style={{ marginTop: margin, marginBottom: margin }}>{newRow}{x}</div></div>)
            }
        }
        else
            return (<div className="horizontal" style={{ marginTop: margin, marginBottom:margin }}>{cellRow}{x}</div>)
    }
}


export default Row;