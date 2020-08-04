import React from 'react';

class Language extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            languageId: this.props.language,
            languages: ["English", "Dutch", "German", "Norwegian"]
        }
        this.handleChange = this.handleChange.bind(this)
        var temp = this.state.languages[0]
        this.state.languages[0] = this.state.languages[this.state.languageId]
        this.state.languages[this.state.languageId] = temp
    }

    handleClick() {
        
    }

    handleChange(e) {
        this.setState({
            languageId: e.target.value
        })
        this.props.press(this.state.languages[e.target.value])
    }

    render() {
        var lang = this.state.languages
        
        var options = []
        for (var i = 0; i < lang.length; i++)
            options.push(<option style={{ direction: "rtl"}} value={i}>{lang[i]}</option>)

        return (<select style={{ marginLeft: "auto", marginRight: "2%", marginTop: "-2%", marginBottom: "1%", textAlignLast: "center" }} onChange={this.handleChange}>  {options}</select>)
    }
}


export default Language;