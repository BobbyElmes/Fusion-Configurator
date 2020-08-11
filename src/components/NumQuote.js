import React from 'react';
import Button from 'react-bootstrap/Button';
import './Cell.css'

class NumQuote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 1
        }
        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }



    submit() {
        this.props.press(this.state.number)
    }

    change(x) {
        var temp = this.state.number;
        if (x == -1) {
            if (temp != 1)
                temp--
        }
        else {
            temp ++
        }
        this.setState({
            number:temp
        })
    }
    

    render() {

        return (<div style={{ display: "inline-block", width: "100%" }}><div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"center" }}>
            <Button variant="success" className="Minus" onClick={() => this.change(-1)}><p style={{ fontSize: "60px", display: "inline-block"  }}>-</p></Button>
            <p style={{marginLeft:"50px", marginRight:"50px", marginTop:"-20px" ,fontSize:"500%"}}>{this.state.number}</p>
            <Button variant="danger" className="Plus" onClick={() => this.change(1)}><p style={{ fontSize: "60px", display: "inline-block" }}>+</p></Button>
        </div>
            <Button variant="Secondary" className="Download" onClick={this.submit} style={{ width: "25%", height: "25%", marginTop: "50px", fontSize: "100%", minWidth:"100px"}}>SUBMIT</Button>
        </div>)
    }
}


export default NumQuote;