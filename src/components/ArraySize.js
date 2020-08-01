import React from 'react';

class ArraySize extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        var size = this.props.size

        return (
            <div>
            <p>W: {size[0]}mm</p>
            <p>H: {size[1]}mm</p>
            </div>
        )
    }
}


export default ArraySize;