import React from 'react';

class ArraySize extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        var size = this.props.size
        var width, height
        if (size[0] == 0)
            width = 0
        else
            width = size[0] * 992 + (size[0] - 1) * 30 + 260

        if (size[1] == 0)
            height = 0
        else
            height = size[1] * 1640 + (size[1] - 1) * 5 + 505
        var widthLen = width.toString().length
        var widthSpace = []
        return (
            <div style={{ textAlign: "right", marginRight: "2%" }}>
                <p style={{ fontFamily: "arial", fontSize: "75%", color: "white", paddingTop: "5%", display: "flex", flexShrink: "0", flexDirection: "row", marginTop: 0, marginBottom: 0 }}><div style={{ marginLeft: "auto", marginRight: "33%", marginTop: 0, marginBottom: 0 }}>H:</div><div> {height}mm</div></p>
                <p style={{ fontFamily: "arial", fontSize: "75%", color: "white", paddingTop: "0%", display: "flex", flexShrink: "0", flexDirection: "row", marginTop: 0, marginBottom: 0 }}><div style={{ marginLeft: "auto", marginRight: "33%", marginTop: 0, marginBottom: 0 }}>W:</div><div> {width}mm</div></p>
                
                <p style={{ fontFamily: "arial", fontSize: "75%", color: "white", margin: "auto", paddingBottom:"10%" }}>To outside of flashing</p>
            </div>
        )
    }
}


export default ArraySize;