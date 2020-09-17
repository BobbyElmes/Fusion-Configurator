import React from 'react';
import './Cell.css';
import warningImg from '.././Imgs/gap-alert.svg'

//This class handles/displays each individual cell you might see as part of the grid, or a mini layout display
//They are comprised of buttons, which is what allows us to perform their necessary behaviour
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

    //when the mouse leaves the current cell
    leave() {
        this.state.over = false
    }

    //we check of mouse up and mouse down so that we can do the click and drag feature
    componentDidMount() {
        document.addEventListener('mousedown', this.down);
        document.addEventListener('mouseup', this.up);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.down);
        document.removeEventListener('mouseup', this.up);
    }

    //when the mouse enters a cell
    enter() {
        //this is so we can display a 'no-access' cursor when your hovering over a cell
        //where you can't place a window
        if(this.props.window != null)
            this.props.window(this.props.row, this.props.column)
        //This is for creating the grey shadow when the click and drag feature is used
        if (this.state.down == true && this.state.over == false) {
            if (this.props.up != null)
                this.props.cellOver(this.props.row, this.props.column)
            this.state.over = true
        }

    }

    //on mouse down
    down() {
        this.state.down = true;
    }

    
    up() {
        this.state.down = false;
        
    }

    //on mouse up
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
        var border = "1px solid black"
        var cursor = this.props.cursor
        var marginL = "0px"
        var marginR = "0px"

        //if displaying the mini grid, make cell smaller
        if (this.props.up == null) {
            ratio = 0.25
            bigDiv = "#E6E7E9"
            cursor = "context-menu"
            border = "0px solid #3b3b3b"
            var size = Math.max(this.props.xSize,this.props.ySize)

            if (size > 6)
                ratio = ratio * 6 / size

            if (this.props.extraSmall && this.props.landscape) {
                if (size > 4)
                    ratio = ratio * 4 / size
            }
            else {
                if (this.props.mobile) {
                    if (size > 2)
                        ratio = ratio * 2 / size
                }
            }

            if (this.props.column == this.props.size - 1)
                marginL = "-1px"
            else if (this.props.column == 0)
                marginR = "-1px"
            else {
                marginL = "-1px"
                marginR = "-1px"
            }
        }

        //This but is work in progress, but we want the grid to fill the screen on mobile
        if (this.props.mobile) {
            if (!this.props.landscape)
                ratioMobile = (this.props.initWidth / (8 * 40)) 
            else {
                ratioMobile = (this.props.initWidth / (6 * 64)) 
            }
        }

        var flash = this.props.flashing

        //here we calculate the size of the cell, which is flipped depending if the panels 
        //Are meant to be landscape or portrait
        var pad
        if (this.props.landscape) {
            pad = [64 * ratio * ratioMobile, 40 * ratio * ratioMobile]
        }
        else {
            pad = [40 * ratio * ratioMobile, 64 * ratio * ratioMobile]
        }

        var cornerStyle = []
        var color = "none"
        //'color' sets the css for the cell. It will be a different colour for a different 
        //flashing type
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
                    //for corner brackets, we can have multiple in one cell, so we do it like so
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
                    color = "Corner"
                }
            }
        }
        if (this.props.warn)
            var warn = <img src={warningImg} style={{ zIndex: "1000",width:"30px"}}/>
        //return, with some ugly inline styling (I'm no css pro)
        if (color == "Corner")
            return (<div className="BigDiv" style={{ background: bigDiv, width: pad[0], height: pad[1], border: border }}>{cornerStyle}<button onMouseDown={this.handleClick} style={{ padding: 0, width: pad[0], height: pad[1], cursor: cursor, zIndex: "12", border: border }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} >{warn}</button></div>)
        if (color == "none")
            return (<button onMouseDown={this.handleClick} style={{ padding: 0, width: pad[0], height: pad[1], cursor: cursor, backgroundColor: bigDiv, border: border, zIndex: "10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} >{warn}</button>)
        else
            return (<button onMouseDown={this.handleClick} style={{ padding: 0, width: pad[0], height: pad[1], cursor: cursor, border: border, zIndex: "10"  }} onMouseEnter={this.enter} onMouseLeave={this.leave} onMouseUp={this.upButton} className={color + ' shadow-none'} ></button>)
    }
}


export default Cell;