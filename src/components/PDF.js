import './PDF.css'
import React from 'react';
import Button from 'react-bootstrap/Button'
import Row from './Row.js'
import FlashingTable from './Table.js'
import { PDFExport } from '@progress/kendo-react-pdf';



//handles the panel drop down menu
class PDFDownload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0
        }

    }

    handleChange(e) {
        console.log("HI")
        this.downloadPDF()
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        this.setState({ height , width});
    }

    exportPDF = () => {
        this.resume.save();
    }


    render() {
        var quotes = this.props.Quotes
        var miniDisplay=[]

        
        for (var i = 0; i < quotes.length; i++) {
            var flashQuotes = quotes[i].miniFlashing
            miniDisplay.push(new Array(flashQuotes.length))
            if (i == 0)
                miniDisplay[i].push(<br></br>)
            miniDisplay[i].push(<div style={{ marginLeft:"60px", textAlign: "left" }}> <p><i>Layout: {i + 1}</i></p></div >)
            
            
            for (var c = 0; c < flashQuotes.length; c++) {
                var marked = []
                console.log("FLASH "+flashQuotes)
                for (var q = 0; q < flashQuotes[c].length; q++)
                    marked.push(false)
                miniDisplay[i].push(<div style={{ marginTop: 0, marginBottom: 0, fontSize: 0 }}><Row key={c} xSize={flashQuotes[c].length} type={null} flashing={flashQuotes[c]} cellPress={null} row={c} down={null} up={null} landscape={quotes.landscape} cellOver={null} marked={marked} pdf={true} /></div>)
                
            }
            miniDisplay[i].push(<br></br>)
        }

        var today = new Date();
        today.toISOString().substring(0, 10);

        //enables export to to pdf
        return (<div style={{ textAlign: "center" }}>
            <Button value={this.state.panelId} onClick={this.exportPDF} >Download pdf </Button>
            <br></br>
            <br></br>
            <PDFExport paperSize={'Letter'}
                forcePageBreak=".page-break"
                fileName={"Fusion Configuarator" + today +".pdf"}
                title="Fusion Configuarator"
                subject=""
                keywords=""
                paperSize="A4"
                margin="1cm"
            ref={(r) => this.resume = r}>
                <div id="oi" className="PDF" ref={(divElement) => { this.divElement = divElement }}>
                <h1>Fusion Configurator </h1>
                 <p><b>Section 1 - layouts</b></p>
                <div>
                    {miniDisplay}
                        <p className="page-break"><b>Section 2 - portrait flashings</b></p>
                        <FlashingTable components={this.props.flashings[0]} discount={this.props.discount} landscape={false} over={1} />
                        <p className="page-break"><b>Section 3 - landscape flashings</b></p>
                        <FlashingTable className="pageBreak" components={this.props.flashings[1]} discount={this.props.discount} landscape={true} over={1} />
                        <p className="page-break"><b>Section 4 - packers</b></p>
                        <FlashingTable className="pageBreak" packers={this.props.flashings[2]} width={-1} discount={this.props.discount} over={1} />
                        <p className="page-break"><b>Section 5 - panels & summary</b></p>
                        <FlashingTable className="pageBreak" panelComponents={this.props.panels} discount={this.props.discount} landscape={false} over={2} total={this.props.total} />
                    </div>
            </div>
        </PDFExport></div>)


    }
}


export default PDFDownload;