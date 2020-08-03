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
        return (
            <div>
                <p>W: {width}mm</p>
                <p>H: {height}mm</p>
            </div>
        )
    }
}


export default ArraySize;