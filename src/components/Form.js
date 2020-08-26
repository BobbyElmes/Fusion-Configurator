import React from 'react';

//------------------------------------------------------------------------------------------------------------
//------------- NOT CURRENTLY IN USE, BUT HANDLES SENDING DATA TO MY AUTOMATED EMAIL API ----------------------
//------------------------------------------------------------------------------------------------------------

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            company: ''
        };
        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onCompanyChange = this.onCompanyChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
    }

    onNameChange(event) {
        this.setState({ name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value })
    }

    onCompanyChange(event) {
        this.setState({ company: event.target.value })
    }

    onSubmit(event) {
        var data = new FormData();
        var flash = this.props.flashings[0]
        var flashL = this.props.flashings[1]
        var panels = this.props.panels
        var packers = this.props.flashings[2]
        console.log(packers)
        console.log("HIf" + flash)
        console.log("HEY " + flashL)
        data.append("name", JSON.stringify(this.state.name))
        data.append("email", JSON.stringify(this.state.email))
        data.append("company", JSON.stringify(this.state.company))
        data.append("discount", JSON.stringify(this.props.discount))
        for (var i = 0; i < flash.length; i++) {
            var c = Math.round(((flash[i][1] * flash[i][2]) * (1 - (this.props.discount / 100)) + Number.EPSILON) * 100) / 100 
            var cost = flash[i][0] + "c"
            data.append(flash[i][0], JSON.stringify(flash[i][1]));
            data.append(cost, JSON.stringify(c));
        }

        for (var i = 0; i < flashL.length; i++) {
            var cost = flashL[i][0] + "c"
            var c = Math.round(((flashL[i][1] * flashL[i][2]) * (1 - (this.props.discount / 100)) + Number.EPSILON) * 100) / 100 
            data.append(flashL[i][0], JSON.stringify(flashL[i][1]));
            data.append(cost, JSON.stringify(c));
        }

        for (var i = 0; i < panels.length; i++) {
            var cost = panels[i][0] + "c"
            var c = Math.round(((panels[i][1] * panels[i][3]) * (1 - (this.props.discount / 100)) + Number.EPSILON) * 100) / 100 
            data.append(panels[i][0], JSON.stringify(panels[i][1]))
            data.append(cost, JSON.stringify(c))
        }

        for (var i = 0; i < packers.length; i++) {
            var cost = packers[i][0] + "c"
            var c = Math.round(((packers[i][1] * packers[i][2]) * (1 - (this.props.discount / 100)) + Number.EPSILON) * 100) / 100
            data.append(packers[i][0], JSON.stringify(packers[i][1]))
            data.append(cost, JSON.stringify(c))
        }

        fetch('https://www.crazymazy.co.uk/email/', {
            method: 'POST',
            body: data
        })

        event.preventDefault()
        
        
    }

    render() {
        return(
        <form onSubmit={this.onSubmit}>
            <label>
                Name:
        <input type="text" value={this.state.value} onChange={this.onNameChange} />
            </label>
            <label>
                Email:
        <input type="text" name="name" onChange={this.onEmailChange}/>
            </label>
            <label>
                Company:
        <input type="text" name="name" onChange={this.onCompanyChange}/>
            </label>
            <input type="submit" value="Submit" />
        </form>)
    }
}


export default Form;