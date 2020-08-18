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
             over: false,
             width: 0
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

  /*  shouldComponentUpdate(nextProps, nextState) {
        var current = window.innerWidth;
        console.log(current)
        console.log(this.state.width)
        if (current != this.state.width) {
            this.state.width = current;
            return true;
        }
        if (this.props.marked === nextProps.marked && this.props.flashing == nextProps.flashing && this.props.landscape == nextProps.landscape) {
            return false;
        } else {
            this.state.width = current;
            return true;
        }
    }*/

    componentDidMount() {
        document.addEventListener('mousedown', this.down);
        document.addEventListener('mouseup', this.up);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.down);
        document.removeEventListener('mouseup', this.up);
    }

    enter() {
        if(this.props.window != null)
            this.props.window(this.props.row, this.props.column)
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
        var ratioMobile = 1
        var bigDiv = "#C6EAFA"
        var cursor = this.props.cursor
        //if displaying the mini grid, make cell smaller
        if (this.props.up == null) {
            ratio = 0.25
            bigDiv = "#E6E7E9"
            cursor = "context-menu"

        }
        if (this.props.mobile) {
            if (!this.props.landscape)
                ratioMobile = (window.innerWidth / (8 * 40)) 
            else {
                ratioMobile = (window.innerWidth / (6 * 64)) 
            }
        }

        var flash = this.props.flashing
        var width = window.innerWidth
        var height = window.innerHeight
        var use = Math.max(width, height)
        var pad, padding
        if (this.props.landscape) {
            pad = [64 * ratio * ratioMobile, 40 * ratio * ratioMobile]
            padding = [40, 25 * ratio]
        }
        else {
            pad = [40 * ratio * ratioMobile, 64 * ratio * ratioMobile]
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
                            color = "Window2"
                        else
                            color = "Window"
                        break;

                }
                if (flash != "none" && color == "none") {
                    var style = ""
                    if (this.props.landscape == true) {
                        style = "-105%"
                    }
                    else {
                        style = "-130%"
                    }
                        var flashArr = flash.split(" ");
                        for (var i = 0; i < flashArr.length; i++) {
                            switch (flashArr[i]) {
                                case "F16-CLT":
                                case "F16-LCLT":
                                    cornerStyle.push(<div style={{right:style}} className="CornerDiv"></div>)
                                    break;
                                case "F16-CRT":
                                case "F16-LCRT":
                                    cornerStyle.push(<div style={{ left: style }} className="CornerDivBottomRight"></div>)
                                    break;
                                case "F16-CLB-S":
                                case "F16-LCLB-S":
                                    cornerStyle.push(<div style={{ right: style }} className="CornerDivTopRight2"></div>)
                                    break;
                                case "F16-CLB":
                                case "F16-LCLB":
                                    cornerStyle.push(<div style={{ right: style }} className="CornerDivTopRight1"></div>)
                                    break;
                                case "F16-CRB":
                                case "F16-LCRB":
                                    cornerStyle.push(<div style={{ left: style }} className="CornerDivTopLeft"></div>)
                                    break;

                            }
                        }
                         var cornerOver = ((<div className="CornerOver"></div>))
                        color = "Corner"
                //    }
                }
                if (flash != "none")
                    flashText = flash
            }
        }

        if(color == "Corner")
            return (<div className="BigDiv" style={{ background: bigDiv }}>{cornerStyle}<button onMouseDown={this.handleClick} style={{ padding: 0, width: pad[0], height: pad[1], cursor: cursor }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} ></button></div>)
        if (color == "none")
            return (<button onMouseDown={this.handleClick} style={{ padding: 0, width: pad[0], height: pad[1], cursor: cursor, backgroundColor: bigDiv }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} ></button>)
        else
            return (<button onMouseDown={this.handleClick} style={{ padding: 0, width: pad[0], height: pad[1], cursor: cursor }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} ></button>)
    }
}


export default Cell;