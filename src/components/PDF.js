import './PDF.css'
import React from 'react';
import Button from 'react-bootstrap/Button'
import Row from './Row.js'
import './Cell.css'
import './Fonts.css'
import pdfImg from '.././Imgs/make_PDF.svg'
import xlsImg from '.././Imgs/make_XLS.svg'
import formatMoney from '.././Functions/FormatMoney.js'
import jsPDF from "jspdf";
import arial from '.././Fonts/arial.ttf'
import segoe from '.././Fonts/segoeui.ttf'
import segoeL from '.././Fonts/segoeuil.ttf'
import segoeB from '.././Fonts/segoeuib.ttf'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Text, StyleSheet, View, Document, Page, PDFDownloadLink, Image, Font, pdf} from "@react-pdf/renderer";

Font.register({
    family: 'Arial',
    format: "truetype", src: arial });
Font.register({
    family: 'Segoe',
    format: "truetype", src: segoe
});
Font.register({
    family: 'SegoeLight',
    format: "truetype", src: segoeL
});
Font.register({
    family: 'SegoeBold',
    format: "truetype", src: segoeB
});

const styles = StyleSheet.create({
    heading: { display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: "20px" },
    heading2: { display: "flex", flexDirection: "row", width: "100%"},
    table: { display: "table", width: "auto"},
    tableRow: { margin: "auto", width: "90%", flexDirection: "row", borderTopWidth: 0.5, borderBottomWidth: 0.5, alignItems: "center", paddingTop: "5px", paddingBottom: "5px" },
    tableRowTop: { margin: "auto", width: "90%", flexDirection: "row", borderTopWidth: 0.5, borderBottomWidth: 0.5, alignItems: "center", paddingTop: "20px", paddingBottom: "20px" },
    tableRowBorderless: { margin: "auto", width: "90%", flexDirection: "row", alignItems: "center", paddingTop: "20px", paddingBottom: "5px" },
    tableCol: { width: "100px", maxWidth: "100px" },
    tableCell: { marginTop: 5, fontSize: 9, float: "right", textAlign: "right", width: "100%", fontFamily: "Segoe" },
    tableCellLeft3: { marginTop: 5, fontSize: 9, textAlign: "left", width: "100%", fontFamily: "Segoe" },
    tableCellLeftB: { marginTop: 5, fontSize: 9, textAlign: "left", width: "100%", fontFamily: "SegoeBold" },
    tableCellB: { marginTop: 5, fontSize: 9, float: "right", textAlign: "right", width: "100%", fontFamily: "SegoeBold" },
    tableCellDis: { marginLeft: "360px", fontSize: 9, width: "100%", fontFamily: "Segoe", marginTop: "45px" },
    headingCell: { marginTop: 0, fontSize: 9, float: "right", textAlign: "right", width: "100%", fontFamily: "Arial" },
    tableCellLeft: { margin: "auto", marginTop: 5, fontSize: 9, maxWidth: "50px", fontFamily: "Segoe" },
    tableCellLeft2: { marginLeft: 100, marginTop: 5, fontSize: 9, maxWidth: "50px", fontFamily: "SegoeBold" },
    title: { fontFamily: "SegoeLight", fontSize: 25 },
    subTitle: { fontFamily: "SegoeLight", fontSize: 18, marginLeft: "7.5%", marginTop: "40px", marginBottom: "-20px" },
    vatText: { fontFamily: "SegoeLight", fontSize: 7, marginLeft: "auto", marginRight:"50px", marginTop: "5", marginBottom: "0" },
    subTitle2: { fontFamily: "SegoeLight", fontSize: 10, maxWidth: "100px" },
    image: { maxWidth: "100px" },
    imgLeft: { width: "75px", height: "100%", marginLeft: "20px", marginRight: "auto" },
    imgRight: { width: "75px", height: "36px", marginLeft: "auto", marginRight: "25px" }
})

//handles the panel drop down menu
class PDFDownload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0,
            length: 0,
            MyDoc: null,
            click: false
        }
        this.createPDF = this.createPDF.bind(this)
    }

    handleChange(e) {
        console.log("HI")
        this.downloadPDF()
    }



    componentDidUpdate() {
        if (this.state.click == true) {
            this.state.click = false;
            this.inputElement.click();
            
        }
    }

    exportPDF = () => {
        this.resume.save();
    }

    copy() {
        const input = document.getElementById('id');
        input.focus()

        html2canvas(input, {
            scrollX: 0,
            scrollY: -window.scrollY,
            scale: 4
        })
            .then((canvas) => {
                var imgWidth = 210;
                var pageHeight = 295;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;
                var doc = new jsPDF('p', 'mm');
                var position = 0;
                doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                var pageCount = doc.internal.getNumberOfPages();
                doc.deletePage(pageCount)
                doc.save('file.pdf');
            })
    }

    createPDF() {
        var firstTable = []
        console.log(this.props.imgs[0])
        var quotes = this.props.Quotes
        var currency = this.props.currency
        console.log("HI")
        firstTable.push([])
        firstTable[0]=(<View style={styles.tableRowBorderless}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>

            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>

            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}>Power</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>Cost</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}>Number</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>Total Power</Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCell}>Total Cost</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px", marginRight: "10px" }}>
                <Text style={styles.tableCell}>{currency[0]}{currency[1]}/Wp</Text>
            </View>
        </View>)
        var totalKwp =0
        var totalCost =0
        for (var i = 0; i < this.props.imgs.length; i++) {
            firstTable.push([])
            firstTable[i+1] = <View style={styles.tableRowTop}>
                <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                    <Text style={styles.tableCellLeft}>{(i+1).toString()}</Text>
                </View>
                <View style={styles.tableCol, { width: "80px", maxWidth:"80px" }}>
                    <Image style={styles.image} src={this.props.imgs[i]}/>
                </View>
                <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                    <Text style={styles.tableCell}>{formatMoney((Math.round(((quotes[i].kwp) + Number.EPSILON) * 100) / 100).toString())}kWp</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCell}>{currency[0]}{formatMoney((Math.round(((((quotes[i].total) * (1 - (this.props.discount / 100))) / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</Text>
                </View>
                <View style={styles.tableCol, { width: "60px", maxWidth: "60px"  }}>
                    <Text style={styles.tableCell}>{quotes[i].quantity}</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px"  }}>
                    <Text style={styles.tableCell}>{formatMoney((Math.round(((quotes[i].kwp * quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString())} kWp</Text>
                </View>
                <View style={styles.tableCol, { width: "80px", maxWidth: "80px"  }}>
                    <Text style={styles.tableCell}>{currency[0]}{formatMoney((Math.round(((((quotes[i].total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</Text>
                </View>
                <View style={styles.tableCol, { width: "60px", maxWidth: "60px", marginRight:"10px"  }}>
                    <Text style={styles.tableCell}>{currency[0]}{formatMoney((Math.round(((((quotes[i].total) * (1 - (this.props.discount / 100))) / (quotes[i].kwp * quotes[i].quantity * 1000)) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}/Wp</Text>
                </View>
            </View>
            totalKwp += quotes[i].kwp * quotes[i].quantity
            totalCost += quotes[i].total
        }
        firstTable.push([])
        firstTable[i + 1] = <View style={styles.tableRowTop}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                <Text style={styles.tableCellLeft2}>Total</Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
               
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCellB}>{formatMoney((Math.round(((totalKwp) + Number.EPSILON) * 100) / 100).toString())} kWp</Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCellB}>{currency[0]}{formatMoney((Math.round(((((totalCost) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px", marginRight: "10px" }}>
                <Text style={styles.tableCellB}>{currency[0]}{formatMoney((Math.round(((((totalCost) * (1 - (this.props.discount / 100))) / (totalKwp * 1000)) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}/Wp</Text>
            </View>
        </View>

        const discount = "Discount Applied "+  this.props.discount +"%"

        var summary = <Page size="A4" style={styles.page}>
            <View style={styles.heading} >
                <Image src={require(".././Imgs/ViridianLogo.png")} style={styles.imgLeft}/>
                <Text style={styles.title}>Configurator </Text>
                <Image src={require(".././Imgs/ClearlineLogo.png")} style={styles.imgRight}/>
            </View>
            <View style={styles.heading2} >
                <Text style={styles.subTitle}>Summary </Text>
                <Text style={styles.tableCellDis}>{discount} </Text>
            </View>
            
            <View style={styles.table}>
                {firstTable}
            </View>
            <Text style={styles.vatText}>Prices exclude VAT and delivery </Text>
        </Page>

        var tables = []
        var fullTables = []
        for (var i = 0; i < quotes.length; i++) {
            tables.push([])
            tables[i].push([])
            tables[i][0].push( <View style={styles.tableRowBorderless}>
                <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                    <Text style={styles.tableCellLeft3}></Text>
                    </View>
                    <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                    <Text style={styles.tableCellLeft3}>Code</Text>
                    </View>
                    <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                        <Text style={styles.tableCellLeft3}>Description</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                        <Text style={styles.tableCell}>Price Each</Text>
                    </View>
                    <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                        <Text style={styles.tableCell}>Number</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCell}>Total Cost</Text>
                </View>
            </View>)
            var count = 0
            for (var c = 0; c < quotes[i].panels.length; c++) {
                if (quotes[i].panels[c][1] > 0) {
                    count ++
                    tables[i].push(<View style={styles.tableRow}>
                        <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                            <Text style={styles.tableCellLeft}>{(count).toString()}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.ids[3][c]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.panels[c][4]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].panels[c][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{quotes[i].panels[c][1] / quotes[i].quantity}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].panels[c][3] * quotes[i].panels[c][1]) / quotes[i].quantity) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }

            var idnum = 0
            if (quotes[i].landscape == true)
                idnum = 1
            for (var c = 0; c < quotes[i].flashingList.length; c++) {
                if (quotes[i].flashingList[c][1] > 0) {
                    count++
                    tables[i].push(<View style={styles.tableRow}>
                        <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                            <Text style={styles.tableCellLeft}>{(count).toString()}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.ids[idnum][c]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.flashings[idnum][c][3]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].flashingList[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{quotes[i].flashingList[c][1] / quotes[i].quantity}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].flashingList[c][2] * quotes[i].flashingList[c][1]) / quotes[i].quantity) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }

            for (var c = 0; c < quotes[i].packers.length; c++) {
                if (quotes[i].packers[c][1] > 0) {
                    count++
                    tables[i].push(<View style={styles.tableRow}>
                        <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                            <Text style={styles.tableCellLeft}>{(count).toString()}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.ids[2][c]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                            <Text style={styles.tableCellLeft3}>{ this.props.flashings[2][c][3] }</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].packers[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{quotes[i].packers[c][1] / quotes[i].quantity}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].packers[c][2] * quotes[i].packers[c][1]) / quotes[i].quantity) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }
            tables[i].push(<View style={styles.tableRow}>
                <View style={styles.tableCol, { width: "450px", maxWidth: "450px" }}>
                    <Text style={styles.tableCellB}>Total for this set</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCellB}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].total) * (1 - (this.props.discount / 100)))) / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                </View>
            </View>)
            tables[i].push(<View style={styles.tableRow}>
                <View style={styles.tableCol, { width: "450px", maxWidth: "450px" }}>
                    <Text style={styles.tableCellB}>Number of sets</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCellB}>{quotes[i].quantity}</Text>
                </View>
            </View>)
            tables[i].push(<View style={styles.tableRow}>
                <View style={styles.tableCol, { width: "450px", maxWidth: "450px" }}>
                    <Text style={styles.tableCellB}>Total</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCellB}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                </View>
            </View>)
            fullTables.push(<View style={styles.table}>{tables[i]}</View>)
        }

        var totalTables = []
        for (var i = 0; i < fullTables.length; i++) {
            totalTables.push(<Page size="A4" style={styles.page}>
                <View style={styles.heading2} ><Text style={styles.subTitle}>Set {i + 1}</Text></View>
                {fullTables[i]}
                <Text style={styles.vatText}>Prices exclude VAT and delivery </Text>
                </Page>)
        }

        var fullItemTable = []
        var itemNumber = 0
        
        fullItemTable.push(<View style={styles.tableRowBorderless}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                <Text style={styles.tableCellLeft3}></Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCellLeft3}>Code</Text>
            </View>
            <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                <Text style={styles.tableCellLeft3}>Description</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>Price Each</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}>Number</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>Total Cost</Text>
            </View>
        </View>)

        for (var i = 0; i < this.props.panels.length; i++) {
            if (this.props.panels[i][1] > 0) {
                itemNumber += 1
                fullItemTable.push(<View style={styles.tableRow}>
                    <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                        <Text style={styles.tableCellLeft}>{(itemNumber).toString()}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                        <Text style={styles.tableCellLeft3}>{this.props.ids[3][i]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                        <Text style={styles.tableCellLeft3}>{this.props.panels[i][4] }</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                        <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                        <Text style={styles.tableCell}>{this.props.panels[i][1]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                        <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.panels[i][3] * this.props.panels[i][1]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                    </View>
                </View>)
            }
        }

        for (var c = 0; c < this.props.flashings.length; c++)
            for (var i = 0; i < this.props.flashings[c].length; i++) {
                if (this.props.flashings[c][i][1] > 0) {
                    itemNumber += 1
                    fullItemTable.push(<View style={styles.tableRow}>
                        <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                            <Text style={styles.tableCellLeft}>{(itemNumber).toString()}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.ids[c][i]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                            <Text style={styles.tableCellLeft3}>{this.props.flashings[c][i][3]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{this.props.flashings[c][i][1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.flashings[c][i][2] * this.props.flashings[c][i][1]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }
        fullItemTable.push(<View style={styles.tableRow}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                <Text style={styles.tableCellLeft}></Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCellLeftB}>TOTAL</Text>
            </View>
            <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                <Text style={styles.tableCellLeft3}></Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCellB}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</Text>
            </View>
        </View>)

        var fullItemPage = (<Page size="A4" style={styles.page}>
            <View style={styles.table}>{fullItemTable}</View>
            <Text style={styles.vatText}>Prices exclude VAT and delivery </Text>
        </Page>)



        this.generatePDFDocument((<Document>
            {summary}
            {fullItemPage}
            {totalTables}
        </Document>))
    }

    generatePDFDocument = async (x) => {
        const blob = await pdf(
            x
      ).toBlob();

        console.log(blob);
        var today = new Date();
        today.toISOString().substring(0, 10);
        var fileName = "Fusion Configuarator - " + today + ".pdf"

        saveAs(blob,  fileName );
    };

    componentWillRecieveProps(nextProps) {
        if (nextProps.imgs.length > this.state.length) {
            return true
        }
        return false
    }


    render() {
        var quotes = this.props.Quotes
        var miniDisplay = []
        var currency = this.props.currency

      /*  var table1 = []
        table1.push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "center",width:"100%" }}>
            <img src={require(".././Imgs/ViridianLogo.png")} style={{ width: "75px", height: "100%", marginLeft: "20px", marginRight: "auto"  }} />
            <div style={{ justifyContent: "center", alignItems:"center" }}><p className="Segoe" style={{ fontSize: "25px"}}>Configurator</p></div>
            <img src={require(".././Imgs/ClearlineLogo.png" )} style={{ width: "75px", height: "100%",marginLeft:"auto", marginRight:"20px" }} />
        </div>)
        table1.push(<div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <p className="Segoe" style={{ fontSize: "18px", marginLeft: "7.5%", marginTop: "40px",marginBottom:"20px" }}>Summary</p>
            <p className="Segoe" style={{ fontSize: "10px", marginLeft: "auto", marginRight: "7.5%", marginTop: "40px" }}>Discount Applied  {this.props.discount}%</p>
            </div>)
        table1.push(<div style={{ display: "inline-block", display: "flex", flexDirection: "row" }}>
            <p className="Arial" style={{ fontSize: "10px", marginLeft: "304px", marginBottom: "-5px" }}><b>Power </b></p>
            <p className="Arial" style={{ fontSize: "10px", marginLeft: "50px", marginBottom: "-5px" }}><b>Cost</b></p>
            <p className="Arial" style={{ fontSize: "10px", marginLeft: "25px", marginBottom: "-5px" }}><b>Number</b></p>
            <p className="Arial" style={{ fontSize: "10px", marginLeft: "18px", marginBottom: "-5px" }}><b>Total Power</b></p>
            <p className="Arial" style={{ fontSize: "10px", marginLeft: "30px", marginBottom: "-5px" }}><b>Total Cost</b></p>
            <p className="Arial" style={{ fontSize: "10px", marginLeft: "48px", marginBottom: "-5px" }}><b>{currency[0]}{currency[1]}/Wp</b></p>
        </div>)
        table1.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "10px", marginTop: "0px" }}></div>)
        var totalKwp = 0
        var totalCost = 0
        for (var i = 0; i < quotes.length; i++) {
            table1.push(<DisplayQuote id={i + 1} currency={currency} quantity={quotes[i].quantity} discount={this.props.discount} total={quotes[i].total} flashings={quotes[i].flashingList} landscape={quotes[i].landscape} miniFlashing={quotes[i].miniFlashing} xSize={quotes[i].xSize} panels={quotes[i].panels} packers={quotes[i].packers} width={quotes[i].width} kwp={quotes[i].kwp} pdf={true} />)
            table1.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "10px", marginTop: "0px" }}></div>)
            totalKwp += quotes[i].kwp * quotes[i].quantity
            totalCost += quotes[i].total
        }
        table1.push(<div style={{ display: "inline-block", display: "flex", flexDirection: "row" }}>
            <p className="Segoe" style={{ fontSize: "10px", marginLeft: "145px", marginBottom: "-5px" }}><b>TOTAL </b></p>
            <p className="Segoe" style={{ fontSize: "10px", marginLeft: "268px", marginBottom: "-5px", float: "right", textAlign: "right", width:"100px"  }}><b>{formatMoney((Math.round(((totalKwp) + Number.EPSILON) * 100) / 100).toString())} kWp</b></p>
            <p className="Segoe" style={{ fontSize: "10px", marginLeft: "-25px", marginBottom: "-5px", float: "right", textAlign: "right", width: "100px" }}><b>{currency[0]}{formatMoney((Math.round(((((totalCost) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}</b></p>
            <p className="Segoe" style={{ fontSize: "10px", marginLeft: "-25px", marginBottom: "-5px", float: "right", textAlign: "right", width: "100px" }}><b>{currency[0]}{formatMoney((Math.round(((((totalCost) * (1 - (this.props.discount / 100))) / (totalKwp * 1000)) + Number.EPSILON) * 100) / 100).toString())}{currency[1]}/Wp</b></p>
        </div>)
        table1.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "10px" }}></div>)
        table1.push(<p className="Segoe" style={{ fontSize: "8px", marginLeft: "495px", marginBottom: "-5px" }}>Prices exclude VAT and delivery</p>)

        var tables = []
        
        for (var i = 0; i < quotes.length; i++) {
            var itemNumber = 1
            tables.push([<p className="Segoe" style={{ textAlign: "left", fontSize: "18px", marginLeft: "7.5%", marginTop: "40px", marginBottom: "20px" }}>Set {i+1}</p>])
            tables[i].push()
            tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-25px" }}>
                <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "120px" }}>Code</p></b>
                <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "72px" }}>Description</p></b>
                <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "220px" }}>Price Each</p></b>
                <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "25px" }}>Number</p></b>
                <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "37px" }}>Total Cost</p></b>


            </div>)
            tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px"}}></div>)
            for (var c = 0; c < quotes[i].panels.length; c++)
                if (quotes[i].panels[c][1] > 0) {
                    tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "12%", width: "10px" }}>{itemNumber}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "80px" }}>{this.props.ids[3][c]}</p>
                        <p className="SegoeReg" style={{ fontSize: "8px", marginLeft: "2%", width: "275px", maxWidth: "275px" }}>{this.props.panels[c][4]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px" }}>{this.props.currency[0]}{ formatMoney((Math.round(((((quotes[i].panels[c][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "4%", width: "40px" }}>{quotes[i].panels[c][1] / quotes[i].quantity}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px"}}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].panels[c][3] * quotes[i].panels[c][1])/quotes[i].quantity) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>

                    </div>)
                    tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
                    itemNumber++
                }

            var idnum = 0
            if (quotes[i].landscape == true)
                idnum = 1
            for (var c = 0; c < quotes[i].flashingList.length; c++)
                if (quotes[i].flashingList[c][1] > 0) {
                    tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left",marginBottom:"-20px" }}>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "12%", width: "10px" }}>{itemNumber}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "80px" }}>{this.props.ids[idnum][c]}</p>
                        <p className="SegoeReg" style={{ fontSize: "8px", marginLeft: "2%", width: "275px", maxWidth: "275px" }}>{this.props.flashings[idnum][c][3]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].flashingList[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "4%", width: "40px" }}>{quotes[i].flashingList[c][1] / quotes[i].quantity}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60" }}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].flashingList[c][2] * quotes[i].flashingList[c][1]) / quotes[i].quantity) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>

                    </div>)
                    tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
                    itemNumber++
                }

            for (var c = 0; c < quotes[i].packers.length; c++)
                if (quotes[i].packers[c][1] > 0) {
                    tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "12%", width: "10px" }}>{itemNumber}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "80px" }}>{this.props.ids[2][c]}</p>
                        <p className="SegoeReg" style={{ fontSize: "8px", marginLeft: "2%", width: "275px", maxWidth: "275px" }}>{this.props.flashings[2][c][3]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].packers[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "4%", width: "40px" }}>{quotes[i].packers[c][1] / quotes[i].quantity}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60" }}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].packers[c][2] * quotes[i].packers[c][1]) / quotes[i].quantity) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>

                    </div>)
                    tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
                    itemNumber++
                }
            tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "505px", width: "100px", float: "right", textAlign: "right" }}>Total for this set</p></b>
                <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "52px" }}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].total) * (1 - (this.props.discount / 100))))/quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p></b>
            </div>)
            tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
            tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "505px", width: "100px", float: "right", textAlign: "right" }}>Number of sets</p></b>
                <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "52px" }}>{quotes[i].quantity}</p></b>
            </div>)
            tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
            tables[i].push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "505px", width: "100px", float: "right", textAlign: "right" }}>Total</p></b>
                <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "52px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p></b>
            </div>)
            tables[i].push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "10px" }}></div>)
            tables[i].push(<p className="Segoe" style={{ fontSize: "8px", marginLeft: "495px", marginBottom: "-5px" }}>Prices exclude VAT and delivery</p>)
        }

        var tableSummary = []
        
        var itemNumber = 1
        tableSummary.push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%",marginTop:"50px", textAlign: "left", marginBottom: "-25px" }}>
            <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "120px" }}>Code</p></b>
            <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "72px" }}>Description</p></b>
            <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "235px" }}>Price Each</p></b>
            <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "25px" }}>Number</p></b>
            <b><p className="Arial" style={{ fontSize: "10px", marginLeft: "30px" }}>Total Cost</p></b>
           

        </div>)
        tableSummary.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
        for (var i = 0; i < this.props.panels.length; i++) {
            if (this.props.panels[i][1] > 0) {
                tableSummary.push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "12%", width: "10px" }}>{itemNumber}</p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "80px" }}>{this.props.ids[3][i]}</p>
                    <p className="SegoeReg" style={{ fontSize: "8px", marginLeft: "2%", width: "275px", maxWidth: "275px" }}>{this.props.panels[i][4]}</p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "4%", width: "40px" }}>{this.props.panels[i][1]}</p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.panels[i][3] * this.props.panels[i][1]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>

                </div>)
                tableSummary.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
                itemNumber++
            }
        }

        for (var c = 0; c < this.props.flashings.length; c++)
            for (var i = 0; i < this.props.flashings[c].length; i++)
                if (this.props.flashings[c][i][1] > 0) {
                    tableSummary.push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "12%", width: "10px" }}>{itemNumber}</p>
                    <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "80px" }}>{this.props.ids[c][i]}</p>
                    <p className="SegoeReg" style={{ fontSize: "8px", marginLeft: "2%", width: "275px", maxWidth: "275px" }}>{this.props.flashings[c][i][3]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "4%", width: "40px" }}>{this.props.flashings[c][i][1]}</p>
                        <p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "2%", width: "60" }}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.flashings[c][i][2] * this.props.flashings[c][i][1]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p>

                </div>)
                    tableSummary.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "2px" }}></div>)
                itemNumber++
                }
        tableSummary.push(<div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "center", width: "100%", textAlign: "left", marginBottom: "-20px" }}>
            <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "123px", width: "10px" }}>Total</p></b>
            <b><p className="SegoeReg" style={{ fontSize: "10px", marginLeft: "523px" }}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.total) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString())}{this.props.currency[1]}</p></b>
        </div>)
        tableSummary.push(<div style={{ display: "inline-block", background: "black", height: "0.5px", width: "85%", marginBottom: "2px", marginTop: "10px" }}></div>)
        tableSummary.push(<p className="Segoe" style={{ fontSize: "8px", marginLeft: "495px", marginBottom: "-5px" }}>Prices exclude VAT and delivery</p>)
        var totalTable = (<div className="page-break" style={{ minHeight: " 297mm", paddingTop: "20px" }}>
            {tableSummary}
        </div>)

        var tablesDivved = []
        for (var i = 0; i < tables.length; i++) {
            tablesDivved.push(<div className="page-break" style={{ minHeight: " 297mm", paddingTop: "20px" }}>
                {tables[i]}
            </div>)
        }

        var today = new Date();
        today.toISOString().substring(0, 10);
        var pdf = <div style={{ marginTop:"200px" }}>
            <div style={{}}>
                <PDFExport
                    forcePageBreak=".page-break"
                    fileName={"Fusion Configuarator" + today + ".pdf"}
                    title="Fusion Configuarator"
                    subject=""
                    keywords=""
                    margin="1cm"
                    ref={(r) => this.resume = r}>
                    <div id="id" className="PDF" ref={(divElement) => { this.divElement = divElement }}>
                        <div>
                            <div style={{ minHeight: " 297mm", paddingTop: "20px" }}>
                                {table1}
                            </div>
                            {totalTable}
                            {tablesDivved}
                        </div>
                    </div>
                    </PDFExport></div></div>

        //enables export to to pdf
     /*   return (<div style={{ textAlign: "left", height: "2000px", maxHeight: "100px", overflowY: "hidden", overflowX: "hidden !important" }}>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "row", overflowX: "hidden !important" }} >
                <img style={{ marginRight: "20px", marginLeft: "600px", width: "60px", cursor: "pointer" }} src={pdfImg} onClick={this.exportPDF} />
                <img style={{ marginRight: "20px", width: "60px", cursor: "pointer" }} src={xlsImg} onClick={() => this.exportPDF()} /> 
                
            </div>
            {pdf}
            
            </div>
        )*/
        var today = new Date();
        today.toISOString().substring(0, 10);

        if (this.props.imgs.length > 0) {

            var MyDoc = this.state.MyDoc

            if(false)
            return (<div>
                <PDFDownloadLink  document={<MyDoc />} fileName={"Fusion Configuarator - " + today + ".pdf"}>
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                    <img ref={input => this.inputElement = input}  style={{ marginRight: "20px", marginLeft: "600px", width: "60px", cursor: "pointer" }} src={pdfImg} />
                    </PDFDownloadLink></div>)
            else
                return (<div><img style={{ marginRight: "20px", marginLeft: "600px", width: "60px", cursor: "pointer" }} src={pdfImg} onClick={this.createPDF} /></div>)
        }
        return(null)


    }
}


export default PDFDownload;