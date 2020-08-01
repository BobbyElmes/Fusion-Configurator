import React from 'react';
import Button from 'react-bootstrap/Button';
import Cell from './Cell.js'
import './Row.css';


class Row extends React.Component {
    constructor(props) {
        super(props)
        this.cellClick = this.cellClick.bind(this)

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

    //displays a row of cells horizontally
    render() {
        var cellRow = []
        

        for (var i = 0; i < this.props.xSize; i++) {
            if(this.props.type == null)
                cellRow.push(<Cell key={i} type={false} press={this.cellClick} flashing={this.props.flashing[i]} row={this.props.row} column={i} down={this.props.down} up={this.props.up} landscape={this.props.landscape} cellOver={this.props.cellOver} marked={this.props.marked[i]} pdf={this.props.pdf} />)
            else
                cellRow.push(<Cell key={i} type={this.props.type[i]} press={this.cellClick} flashing={this.props.flashing[i]} row={this.props.row} column={i} down={this.props.down} up={this.props.up} landscape={this.props.landscape} cellOver={this.props.cellOver} marked={this.props.marked[i]} />)
        }

        return (<div className="layout"><div className="divForHor"><div className="horizontal">{cellRow}</div></div></div>)
    }
}


export default Row;