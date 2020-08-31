import React from 'react';

//Calculates the size of the array being built in the grid
//And displays that to the user
class ArraySize extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        var size = this.props.size
        var width, height

        //Check if we're calculating width or height of array
        if (size[0] == 0)
            width = 0
        else {
            //We have different sizes depending on if it's landscape or portrait
            if (this.props.landscape == true) 
                width = size[0] * 1640 + (size[0] - 1) * 30 + 260
            else
                width = size[0] * 992 + (size[0] - 1) * 30 + 260
        }

        if (size[1] == 0)
            height = 0
        else {
            if (this.props.landscape == true) 
                height = size[1] * 992 + (size[1] - 1) * 5 + 505
            else
                height = size[1] * 1640 + (size[1] - 1) * 5 + 505
        }

        if (this.props.mobile) {
            return (
                <div style={{ textAlign: "right", marginRight: "2%", display: "flex", flexDirection: "column",width:"30%" }}>
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "row", marginRight: "5px", marginLeft: "auto", textAlign: "right", float: "right" }}><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "10px", textAlign: "left" }}>H: </p><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "60px", textAlign: "right" }}>{height}mm</p></div>
                    <div style={{ marginTop: "-10px", marginBottom: "-15px", display: "flex", flexDirection: "row", marginRight: "5px", marginLeft: "auto", textAlign: "right", float: "right" }}><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "10px", textAlign: "left" }}>W:</p><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "60px", textAlign: "right" }}> {width}mm</p></div>

                </div>
            )
        }
        else
            return (
                <div style={{ textAlign: "right", marginRight: "2%", display: "flex", flexDirection: "column" }}>
                    <div style={{ marginTop: "15px", display: "flex", flexDirection: "row", marginRight: "5px", marginLeft: "auto", textAlign: "right", float: "right" }}><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "10px", textAlign: "left" }}>H: </p><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "60px",textAlign: "right" }}>{height}mm</p></div>
                    <div style={{ marginTop: "-15px", marginBottom: "-15px", display: "flex", flexDirection: "row", marginRight: "5px", marginLeft: "auto", textAlign: "right",float:"right" }}><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "10px", textAlign: "left" }}>W:</p><p style={{ fontFamily: "arial", fontSize: "75%", color: "white", width: "60px",textAlign: "right" }}> {width}mm</p></div>

                    <p style={{ marginTop: "-30px",fontFamily: "arial", fontSize: "75%", color: "white", margin: "auto", marginBottom: "10px", marginRight: "5px", marginLeft: "auto", direction: "rtl",width:"150px",float:"right" }}>{this.props.outsideWord}</p>
                </div>
            )

    }
}


export default ArraySize;