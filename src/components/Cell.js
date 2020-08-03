import React from 'react';
import Button from 'react-bootstrap/Button';
import './Cell.css';

class Cell extends React.Component {
     constructor(props){
         super(props)
         this.handleClick = this.handleClick.bind(this)
         this.enter = this.enter.bind(this)
         this.leave = this.leave.bind(this)
         this.down = this.down.bind(this)
         this.up = this.up.bind(this)
         this.upButton = this.upButton.bind(this)
         this.state = {
             down: false,
             over:false
         }
    }

    //when the cell is clicked, trigger function in parent class
    handleClick() {
        if (this.props.up != null)
            this.props.down(this.props.row, this.props.column)
        //this.props.press(this.props.column, this.props.row)
    }

    leave() {
        this.state.over = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.marked === nextProps.marked && this.props.flashing == nextProps.flashing && this.props.landscape == nextProps.landscape) {
            return false;
        } else {
            return true;
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.down);
        document.addEventListener('mouseup', this.up);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.down);
        document.removeEventListener('mouseup', this.up);
    }

    enter() {

        if (this.state.down == true && this.state.over == false) {
            if (this.props.up != null)
                this.props.cellOver(this.props.row, this.props.column)
            this.state.over = true
        }

    }

    down() {
        this.state.down = true;
        
    }

    up() {
        this.state.down = false;
        
    }

    upButton() {
        if(this.props.up != null)
            this.props.up(this.props.column, this.props.row)
        this.state.down = false;
    }

    //render cell
    render() {
        var ratio = 1
        //if displaying the mini grid, make cell smaller
        if (this.props.up == null)
            ratio = 0.25
        var flash = this.props.flashing
        var width = window.innerWidth
        var height = window.innerHeight
        var use = Math.max(width, height)
        var pad, padding
        if (this.props.landscape) {
            pad = [(use / 40) * 1.6 * ratio, (use / 40) * ratio]
            padding = [40 * ratio, 25 * ratio]
        }
        else {
            pad = [(use / 40) * ratio, (use / 40) * 1.6 * ratio]
            padding = [25 * ratio, 40 * ratio]
        }
        var flashText = ""
        var cornerStyle = []
        var color = "none"
        if (this.props.marked == true)
            color = "SELECTED"
        else {
            if (flash != null) {
                switch (flash) {
                    case "F16-TC":
                    case "F16-LC":
                        color = "TC"
                        break;
                    case "F16-TR":
                    case "F16-LR":
                        color = "TR"
                        break;
                    case "F16-TL":
                    case "F16-LL":
                        color = "TL"
                        break;
                    case "F16-TY":
                    case "F16-LY":
                        color = "TY"
                        break;
                    case "F16-J":
                    case "F16-LJ":
                        color = "J"
                        break;
                    case "VAT-16":
                    case "VAL-16":
                        color = "VAT-16"
                        break;
                    case "F16-VC":
                        if (this.props.pdf == true)
                            color = "PDFWindow"
                        else
                            color = "Window"
                        break;

                }
                if (flash != "none" && color == "none") {
                 //   if (this.props.pdf == true)
               //         color = "PDFCorner"
                //    else {
                        var flashArr = flash.split(" ");
                        for (var i = 0; i < flashArr.length; i++) {
                            switch (flashArr[i]) {
                                case "F16-CLT":
                                case "F16-LCLT":
                                    cornerStyle.push(<div className="CornerDiv"></div>)
                                    break;
                                case "F16-CRT":
                                case "F16-LCRT":
                                    cornerStyle.push(<div className="CornerDivBottomRight"></div>)
                                    break;
                                case "F16-CLB-S":
                                case "F16-LCLB-S":
                                    cornerStyle.push(<div className="CornerDivTopRight2"></div>)
                                    break;
                                case "F16-CLB":
                                case "F16-LCLB":
                                    cornerStyle.push(<div className="CornerDivTopRight1"></div>)
                                    break;
                                case "F16-CRB":
                                case "F16-LCRB":
                                    cornerStyle.push(<div className="CornerDivTopLeft"></div>)
                                    break;

                            }
                        }
                        color = "Corner"
                //    }
                }
                if (flash != "none")
                    flashText = flash
            }
        }


        return (<div className="BigDiv">{cornerStyle}<Button onMouseDown={this.handleClick} style={{ paddingRight: padding[0], paddingTop: padding[1], cornerStyle }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} ></Button></div >)
    }
}


export default Cell;