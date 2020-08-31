
import React from 'react';
import './Cell.css'
import './Fonts.css'
import './PDF.css'
import pdfImg from '.././Imgs/make_PDF.svg'
import xlsImg from '.././Imgs/make_XLS.svg'
import formatMoney from '.././Functions/FormatMoney.js'

//Here we use some replacement fonts to generate the PDF because "apparently" it's like illegal to use fonts without a license? idk who made that up :(
import vera from '.././Fonts/Vera.ttf'
import roboto from '.././Fonts/Roboto-Thin.ttf'
import robotoR from '.././Fonts/Roboto-Regular.ttf'
import robotoB from '.././Fonts/Roboto-Bold.ttf'

//--------------------------------------------------------------------------------------------
import { saveAs } from 'file-saver';
import { Text, StyleSheet, View, Document, Page, Image, Font, pdf } from "@react-pdf/renderer";
import { isLegacyEdge, isEdgeChromium, isMobile } from 'react-device-detect';
//--------------------------------------------------------------------------------------------


//Importing Excel stuff//---------------------------------------------------------------------
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//--------------------------------------------------------------------------------------------




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// THIS FILE HANDLES CLIENT SIDE PDF GENERATION AND EXCEL GENERATION - This was the cleanest available solution that exists at this current time for react - it's a lot of lines of code
// because pretty much everything needs to be specified in the respective excel & pdf package syntax
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




//Fonts used in the PDF
//vera is a free font, similar to arial and roboto is a free similar font to segoe
Font.register({
    family: 'Arial',
    format: "truetype", src: vera });
Font.register({
    family: 'Segoe',
    format: "truetype", src: robotoR
});
Font.register({
    family: 'SegoeLight',
    format: "truetype", src: roboto
});
Font.register({
    family: 'SegoeBold',
    format: "truetype", src: robotoB
});



//StyleSheet for the PDF, has to be done this way unfortunately, so we need a seperate stype for each element which might be styled differently
const styles = StyleSheet.create({
    page: {},
    date: { fontFamily: "SegoeLight", fontSize: 10, top: "96%", left: "20px" },
    number: { fontFamily: "SegoeLight", fontSize: 10, top: "94%", left: "49%"},
    heading: { display: "flex", flexDirection: "row", justifyContent: "center", width: "100%", marginTop: "10px" },
    heading2: { display: "flex", flexDirection: "row", width: "100%"},
    table: { display: "table", width: "auto"},
    newTable: { display: "table", width: "auto",marginTop:"60px" },
    tableRow: { margin: "auto", width: "90%", flexDirection: "row", borderTopWidth: 0.5, borderBottomWidth: 0.5, alignItems: "center", paddingTop: "5px", paddingBottom: "5px" },
    tableRowTop: { margin: "auto", width: "90%", flexDirection: "row", borderTopWidth: 0.5, borderBottomWidth: 0.5, alignItems: "center", paddingTop: "20px", paddingBottom: "20px" },
    tableRowBorderless: { margin: "auto", width: "90%", flexDirection: "row", alignItems: "center", paddingTop: "20px", paddingBottom: "5px" },
    tableCol: { width: "100px", maxWidth: "100px" },
    tableCell: { marginTop: 5, fontSize: 9, float: "right", textAlign: "right", width: "100%", fontFamily: "Segoe" },
    tableCellLeft3: { marginTop: 5, fontSize: 9, textAlign: "left", width: "100%", fontFamily: "Segoe" },
    tableCellLeftB: { marginTop: 5, fontSize: 9, textAlign: "left", width: "100%", fontFamily: "SegoeBold" },
    tableCellB: { marginTop: 5, fontSize: 9, float: "right", textAlign: "right", width: "100%", fontFamily: "SegoeBold" },
    tableCellDis: { marginLeft: "auto", textAlign: "right", marginRight:"40px", fontSize: 9, width: "100%", fontFamily: "Segoe", marginTop: "45px" },
    headingCell: { marginTop: 0, fontSize: 9, float: "right", textAlign: "right", width: "100%", fontFamily: "Arial" },
    tableCellLeft: { margin: "auto", marginTop: 5, fontSize: 9, maxWidth: "50px", fontFamily: "Segoe" },
    tableCellLeft2: { marginLeft: 100, marginTop: 5, fontSize: 9, maxWidth: "50px", fontFamily: "SegoeBold" },
    title: { fontFamily: "SegoeLight", fontSize: 25,marginTop:"40px" },
    subTitle: { fontFamily: "SegoeLight", fontSize: 18, marginLeft: "7.5%", marginTop: "40px", marginBottom: "-20px" },
    vatText: { fontFamily: "SegoeLight", fontSize: 7, marginLeft: "auto", marginRight:"50px", marginTop: "5", marginBottom: "0" },
    subTitle2: { fontFamily: "SegoeLight", fontSize: 10, maxWidth: "100px" },
    image: { maxWidth: "100px" },
    imgLeft: { width: "12%", marginLeft: "20px", marginRight: "auto" },
    imgLeft2: { width: "12%", marginLeft: "20px",marginRight:"3px"},
    imgRight: { width: "12%", marginLeft: "auto", marginRight: "40px" },
    imgLeft3: { width: "12%", marginLeft: "0px", marginRight: "65px" }
})


//Class which handles client side generation and downloading of PDF and XLSX formats
class PDFDownload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            width: 0,
            length: 0,
            multiDataSet: []
        }
        this.createPDF = this.createPDF.bind(this)
        this.excelExport = this.excelExport.bind(this)
        this.getFileName = this.getFileName.bind(this)
    }


   
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  This function handle exporting to the XLSX format
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    excelExport() {
        //just an incremental item number
        var count = 1
        //variables for the words used
        var words = this.props.wordList
        var lang = this.props.lang

        //Column headings with styling declared in the first spreadsheet (the overall total items table)
        var multiDataSet = [
            {
                columns: [
                    { title: words[18][lang], width: { wch: 5 } },//Item
                    { title: words[14][lang], width: { wch: 15 } },//Code
                    { title: words[15][lang], width: { wch: 75 } }, //Description
                    { title: words[11][lang], width: { wch: 15 }, style: { alignment: { horizontal: "right" }, font: {bold:true} } }, //Cost
                    { title: words[12][lang], width: { wch: 10 }, style: { alignment: { horizontal: "right" }, font: { bold: true } } }, //Number
                    { title: words[6][lang], width: { wch: 20 }, style: { alignment: { horizontal: "right" }, font: { bold: true } } }, //Total
                ],
                data: [
                    
                ]
            }
        ];

        //Now we loop through: panels & flashings/packers and add the ones with one or more item to the total table
        //panels
        for (var i = 0; i < this.props.panels.length; i++) {
            if (this.props.panels[i][1] > 0) {
                if (this.props.currency[1] == null) {
                    var cost = (this.props.currency[0] + formatMoney((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                    var total = ((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * this.props.panels[i][1])
                    total = this.props.currency[0] + formatMoney((Math.round(((total) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)
                }
                else {
                    var cost = (formatMoney((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                    var total = ((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * this.props.panels[i][1])
                    total = (formatMoney((Math.round(((total) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                }
                multiDataSet[0].data.push([
                    { value: count.toString(), style: { alignment: { vertical: "top" } } },
                    { value: this.props.ids[3][i].toString(), style: { alignment: { vertical: "top" } } },
                    { value: this.props.panels[i][4].toString(), style: { alignment: { wrapText: true } } },
                    { value: cost.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                    { value: this.props.panels[i][1].toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                    { value: total.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } }])
                count ++
            }
        }

        //flashings/packers - first portrait, then landscape, then packers
        for (var c = 0; c < this.props.flashings.length; c++)
        for (var i = 0; i < this.props.flashings[c].length; i++) {
            if (this.props.flashings[c][i][1] > 0) {
                if (this.props.currency[1] == null) {
                    var cost = (this.props.currency[0] + formatMoney((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                    var total = ((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * this.props.flashings[c][i][1])
                    total = (this.props.currency[0] + formatMoney((Math.round(((total) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                }
                else {
                    var cost = formatMoney((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1]
                    var total = ((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * this.props.flashings[c][i][1])
                    total = (formatMoney((Math.round(((total) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                }
                multiDataSet[0].data.push([
                    { value: count.toString(), style: { alignment: { vertical: "top" } } },
                    { value: this.props.ids[c][i].toString(), style: { alignment: { vertical: "top" } } },
                    { value: this.props.flashings[c][i][3].toString(), style: { alignment: { wrapText: true } } },
                    { value: cost.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                    { value: this.props.flashings[c][i][1].toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                    { value: total.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } }])
                count++
            }
            }
        if (this.props.currency[1] == null) 
            var total = this.props.currency[0] + formatMoney(((Math.round(((this.props.total) + Number.EPSILON) * 100) / 100).toString()), this.props.eur)
        else 
            var total = formatMoney(this.props.total.toString(), this.props.eur) + this.props.currency[1] 

        //Now we add the final rows to the bottom of the spreadsheet (overall total price ect)
        multiDataSet[0].data.push([
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" } ,
            { value: "" }])
        multiDataSet[0].data.push([
            { value: "" },
            { value: "" },
            { value: words[6][lang], style: { alignment: { vertical: "top", horizontal: "right" } } },
            { value: "" },
            { value: "" },
            { value: total, style: { alignment: { vertical: "top", horizontal: "right" } } }])
        multiDataSet[0].data.push([
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" },
            { value: "" }])
        multiDataSet[0].data.push([
            { value: "" },
            { value: "" },
            { value: words[13][lang], style: { alignment: { vertical: "top", horizontal: "right" } } },
            { value: "" },
            { value: "" },
            { value: "" }])

        //Now we loop through the quote list and create a sheet for each quote, similar procedure to before
        var quotes = this.props.Quotes
        var tables = []
        var sheets = []
        for (var i = 0; i < quotes.length; i++) {
            //Column headers of 'i'th quote
            var tables = [
                {
                    columns: [
                        { title: words[18][lang], width: { wch: 5 } },//pixels width 
                        { title: words[14][lang], width: { wch: 15 } },//char width 
                        { title: words[15][lang], width: { wch: 75 } },
                        { title: words[11][lang], width: { wch: 15 }, style: { alignment: { horizontal: "right" }, font: { bold: true } } },
                        { title: words[12][lang], width: { wch: 10 }, style: { alignment: { horizontal: "right" }, font: { bold: true } } },
                        { title: words[6][lang], width: { wch: 20 }, style: { alignment: { horizontal: "right" }, font: { bold: true } } },
                    ],
                    data: [

                    ]
                }
            ]
            var count = 0

            //Loop through panels, then the flashing list of whatever orientation was used, then packers
            //Panels
            for (var c = 0; c < quotes[i].panels.length; c++) {
                if (quotes[i].panels[c][1] > 0) {
                    count++
                    if (this.props.currency[1] == null) {
                        var cost = (this.props.currency[0] + formatMoney((Math.round(((((quotes[i].panels[c][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                        var total = ((Math.round((((((quotes[i].panels[c][3]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].panels[c][1])
                        total = (this.props.currency[0] + formatMoney((Math.round(((total / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                    }
                    else {
                        var cost = (formatMoney((Math.round(((((quotes[i].panels[c][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                        var total = ((Math.round((((((quotes[i].panels[c][3]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].panels[c][1])
                        total = (formatMoney((Math.round(((total / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                    }
                    tables[0].data.push([
                        { value: count.toString(), style: { alignment: { vertical: "top" } } },
                        { value: this.props.ids[3][c].toString(), style: { alignment: { vertical: "top" } } },
                        { value: quotes[i].panels[c][4].toString(), style: { alignment: { wrapText: true } } },
                        { value: cost.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                        { value: (quotes[i].panels[c][1]/quotes[i].quantity).toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                        { value: total.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } }])
                }
            }
            //use the first array in the IDs list if portrait, otherwise use the second
            var numFlash = 0
            if (quotes[i].landscape)
                numFlash = 1

            //flashing list
            for (var c = 0; c < quotes[i].flashingList.length; c++) {
                if (quotes[i].flashingList[c][1] > 0) {
                    count++
                    if (this.props.currency[1] == null) {
                        var cost = (this.props.currency[0] + formatMoney((Math.round(((((quotes[i].flashingList[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                        var total = ((Math.round((((((quotes[i].flashingList[c][2]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].flashingList[c][1])
                        total = (this.props.currency[0] + formatMoney((Math.round(((total / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                    }
                    else {
                        var cost = (formatMoney((Math.round(((((quotes[i].flashingList[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                        var total = ((Math.round((((((quotes[i].flashingList[c][2]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].flashingList[c][1])
                        total = (formatMoney((Math.round(((total / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                    }
                    tables[0].data.push([
                        { value: count.toString(), style: { alignment: { vertical: "top" } } },
                        { value: this.props.ids[numFlash][c].toString(), style: { alignment: { vertical: "top" } } },
                        { value: quotes[i].flashingList[c][3].toString(), style: { alignment: { wrapText: true } } },
                        { value: cost.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                        { value: (quotes[i].flashingList[c][1] / quotes[i].quantity).toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                        { value: total.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } }])
                }
            }

            //packers
            for (var c = 0; c < quotes[i].packers.length; c++) {
                if (quotes[i].packers[c][1] > 0) {
                    count++
                    if (this.props.currency[1] == null) {
                        var cost = (this.props.currency[0] + formatMoney((Math.round(((((quotes[i].packers[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                        var total = ((Math.round((((((quotes[i].packers[c][2]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].packers[c][1])
                        total = (this.props.currency[0] + formatMoney((Math.round(((total / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur))
                    }
                    else {
                        var cost = (formatMoney((Math.round(((((quotes[i].packers[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                        var total = ((Math.round((((((quotes[i].packers[c][2]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].packers[c][1])
                        total = (formatMoney((Math.round(((total / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1])
                    }
                    tables[0].data.push([
                        { value: count.toString(), style: { alignment: { vertical: "top" } } },
                        { value: this.props.ids[2][c].toString(), style: { alignment: { vertical: "top" } } },
                        { value: quotes[i].packers[c][3].toString(), style: { alignment: { wrapText: true } } },
                        { value: cost.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                        { value: (quotes[i].packers[c][1] / quotes[i].quantity).toString(), style: { alignment: { vertical: "top", horizontal: "right" } } },
                        { value: total.toString(), style: { alignment: { vertical: "top", horizontal: "right" } } }])
                }
            }

            if (this.props.currency[1] == null) {
                var total = this.props.currency[0] + formatMoney((Math.round((((((quotes[i].total))) / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)
                var grandTotal = this.props.currency[0] + formatMoney((quotes[i].total).toString(), this.props.eur) 
            }
            else {
                var total = formatMoney((Math.round((((((quotes[i].total))) / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur) + this.props.currency[1]
                var grandTotal = formatMoney((quotes[i].total).toString(), this.props.eur) + this.props.currency[1]
            }

            //Push totals and stuff to the bottom of each sheet
            tables[0].data.push([
                { value: "" },
                { value: "" },
                { value: "" },
                { value: "" },
                { value: "" },
                { value: "" }])
            tables[0].data.push([
                { value: "" },
                { value: "" },
                { value: words[20][lang], style: { alignment: { vertical: "top", horizontal: "right" } } },
                { value: "" },
                { value: "" },
                { value: total, style: { alignment: { vertical: "top", horizontal: "right" } } }])
            tables[0].data.push([
                { value: "" },
                { value: "" },
                { value: words[21][lang], style: { alignment: { vertical: "top", horizontal: "right" } } },
                { value: "" },
                { value: "" },
                { value: quotes[i].quantity, style: { alignment: { vertical: "top", horizontal: "right" } } }])
            tables[0].data.push([
                { value: "" },
                { value: "" },
                { value: words[6][lang], style: { alignment: { vertical: "top", horizontal: "right" } } },
                { value: "" },
                { value: "" },
                { value: grandTotal, style: { alignment: { vertical: "top", horizontal: "right" } } }])
            tables[0].data.push([
                { value: "" },
                { value: "" },
                { value: "" },
                { value: "" },
                { value: "" },
                { value: "" }])
            tables[0].data.push([
                { value: "" },
                { value: "" },
                { value: words[13][lang], style: { alignment: { vertical: "top", horizontal: "right" } } },
                { value: "" },
                { value: "" },
                { value: "" }])


            sheets.push(<ExcelSheet dataSet={tables} name={words[17][lang]+" " + (i + 1).toString()} />)
        }
        var filename = this.getFileName()
        this.state.multiDataSet = multiDataSet

        if (this.props.mobile)
            var width = "90px"
        else
            var width = "60px"
        //return full excel file data
        return < ExcelFile filename={filename} element={< img style={{ width: width, cursor: "pointer" }} src={xlsImg} />}>
            <ExcelSheet dataSet={multiDataSet} name={words[7][lang]} />
            {sheets}
                </ExcelFile >
        
    }




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                  This function handle exporting to the PDF format
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    createPDF() {
        //array for the first table in the first page
        var firstTable = []

        //get quotes, currency strings, words to use and the language
        var quotes = this.props.Quotes
        var currency = this.props.currency
        var words = this.props.wordList
        var lang = this.props.lang

        //discount put into a string in whatever language
        const discount = words[9][lang] + " " + this.props.discount + "%"

        //pageNum is to use for numbering the PDF pages
        var pageNum = 0

        //get the date for the file name
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var summary =[]

        today = mm + '/' + dd + '/' + yyyy;

        var index =0 

        //Create table for the first page(s) of PDF
        firstTable.push([[]])
        //Push table headings
        firstTable[index][0]=(<View style={styles.tableRowBorderless}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>

            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>

            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}>{words[10][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>{words[11][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}>{words[12][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>{words[6][lang] + " " + words[10][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCell}>{words[6][lang] + " " + words[11][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px", marginRight: "10px" }}>
                <Text style={styles.tableCell}>{currency[0]}{currency[1]}/Wp</Text>
            </View>
        </View>)
        var totalKwp =0
        var totalCost = 0

     /*  if (this.props.logo2 != null) {
            var logo3 = <Image src={require(".././Imgs/" + this.props.logo2)} style={styles.imgLeft3} />
            var logo1 = <Image src={require(".././Imgs/" + this.props.logo1)} style={styles.imgLeft2} />
            var logo2 = <Image src={require(".././Imgs/" + this.props.logo3)} style={styles.imgRight} />
        }
        else {
            var logo1 = <Image src={require(".././Imgs/" + this.props.logo1)} style={styles.imgLeft} />
            var logo2 = <Image src={require(".././Imgs/" +this.props.logo3)} style={styles.imgRight} />
        }*/

          if (this.props.logo2 != null) {
            var logo3 = <Image src={"https://www.fusionconfigurator.com/static/Logos/" + this.props.logo2} style={styles.imgLeft3} />
            var logo1 = <Image src={"https://www.fusionconfigurator.com/static/Logos/" + this.props.logo1} style={styles.imgLeft2} />
            var logo2 = <Image src={"https://www.fusionconfigurator.com/static/Logos/" + this.props.logo3} style={styles.imgRight} />
        }
        else {
            var logo1 = <Image src={("https://www.fusionconfigurator.com/static/Logos/" + this.props.logo1)} style={styles.imgLeft} />
            var logo2 = <Image src={"https://www.fusionconfigurator.com/static/Logos/" + this.props.logo3} style={styles.imgRight} />
        }
        
        //Push each quote summary row by row
        for (var i = 0; i < this.props.imgs.length; i++) {

            //if there are more than 6 rows, continue on a new page and add the title ect
            //to the first page
            if ((i+ 1) % 6 == 0) {
                pageNum++
                if(summary.length == 0)
                    summary.push(<Page size="A4" style={styles.page}>
                        <Text fixed style={styles.date}>{today}</Text>
                        <Text fixed style={styles.number}>{pageNum}</Text>
                        <View style={styles.heading} >
                            {logo1}
                            {logo3}
                            <Text style={styles.title}>Configurator </Text>
                            {logo2}
                        </View>
                        
                        <View style={styles.heading2} >
                            <Text style={styles.subTitle}>{words[7][lang]} </Text>
                            <Text style={styles.tableCellDis}>{discount} </Text>
                        </View>

                        <View style={styles.table}>
                            {firstTable[index]}
                        </View>
                    </Page>)
                else
                    summary.push(<Page size="A4" wrap style={styles.page}>
                        <Text fixed style={styles.date}>{today}</Text>
                        <Text fixed style={styles.number}>{pageNum}</Text>
                        <View style={styles.newTable}>
                            {firstTable[index]}
                        </View>
                    </Page>)
                index++
                firstTable.push([])
            }

            //Push each row in the first page
            firstTable[index].push([])
            firstTable[index][i+1] = <View style={styles.tableRowTop}>
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
                    <Text style={styles.tableCell}>{currency[0]}{formatMoney((Math.round(((((quotes[i].total)) / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]}</Text>
                </View>
                <View style={styles.tableCol, { width: "60px", maxWidth: "60px"  }}>
                    <Text style={styles.tableCell}>{quotes[i].quantity}</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px"  }}>
                    <Text style={styles.tableCell}>{formatMoney((Math.round(((quotes[i].kwp * quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(),this.props.eur)} kWp</Text>
                </View>
                <View style={styles.tableCol, { width: "80px", maxWidth: "80px"  }}>
                    <Text style={styles.tableCell}>{currency[0]}{formatMoney((Math.round((((quotes[i].total)) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]}</Text>
                </View>
                <View style={styles.tableCol, { width: "60px", maxWidth: "60px", marginRight:"10px"  }}>
                    <Text style={styles.tableCell}>{currency[0]}{formatMoney((Math.round(((((quotes[i].total)) / (quotes[i].kwp * quotes[i].quantity * 1000)) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]}/Wp</Text>
                </View>
            </View>
            totalKwp += quotes[i].kwp * quotes[i].quantity
            totalCost += quotes[i].total
        }
        firstTable[index].push([])
        //Push the bottom row (with total price ect) to the first page
        firstTable[index][i + 1] = <View style={styles.tableRowTop}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                <Text style={styles.tableCellLeft2}>{words[6][lang]}</Text>
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
                <Text style={styles.tableCellB}>{formatMoney((Math.round(((totalKwp) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)} kWp</Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCellB}>{currency[0]}{formatMoney((Math.round((((totalCost)) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]}</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px", marginRight: "10px" }}>
                <Text style={styles.tableCellB}>{currency[0]}{formatMoney((Math.round(((((totalCost)) / (totalKwp * 1000)) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{currency[1]}/Wp</Text>
            </View>
        </View>

        //Add the final page to the summary (most likely the summary is just one page, which is the first case)
        pageNum++
        if (index == 0) {
            summary.push(<Page size="A4" style={styles.page}>
                <Text fixed style={styles.date}>{today}</Text>
                <Text fixed style={styles.number}>{pageNum}</Text>
                <View style={styles.heading} >
                    {logo1}
                    {logo3}
                    <Text style={styles.title}>Configurator </Text>
                    {logo2}
                </View>
                <View style={styles.heading2} >
                    <Text style={styles.subTitle}>{words[7][lang]} </Text>
                    <Text style={styles.tableCellDis}>{discount} </Text>
                </View>

                <View style={styles.table}>
                    {firstTable[index]}
                </View>
                <Text style={styles.vatText}>{words[13][lang]} </Text>
            </Page>)
        }
        else
            summary.push(<Page size="A4" wrap style={styles.page} >
                <Text fixed style={styles.date}>{today}</Text>
                <Text fixed style={styles.number}>{pageNum}</Text>
            <View style={styles.newTable}>
                {firstTable[index]}
                </View>
                <Text style={styles.vatText}>{words[13][lang]} </Text>
                        </Page>)


        //Now we are going to build the second table, which is the table with the totals of all the items
        //for all the quotes

        var fullItemTable = []
        var itemNumber = 0
        fullItemTable.push([])
        var index = 0

        //Add table headings
        fullItemTable[index].push(<View style={styles.tableRowBorderless}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                <Text style={styles.tableCellLeft3}></Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCellLeft3}>{words[14][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                <Text style={styles.tableCellLeft3}>{words[15][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>{words[16][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                <Text style={styles.tableCell}>{words[12][lang]}</Text>
            </View>
            <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                <Text style={styles.tableCell}>{words[6][lang] + " " + words[11][lang]}</Text>
            </View>
        </View>)

        //Like in the XLSX generation, loop through panels and flashings/packers to add relevant rows to the table
        //Panels
        for (var i = 0; i < this.props.panels.length; i++) {
            if (this.props.panels[i][1] > 0) {
                itemNumber += 1
                //We have to round these numbers because --- JavaScript bad -----
                var totalVal = ((Math.round((((((this.props.panels[i][3])) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * this.props.panels[i][1])
                fullItemTable[index].push(<View style={styles.tableRow}>
                    <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                        <Text style={styles.tableCellLeft}>{(itemNumber).toString()}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                        <Text style={styles.tableCellLeft3}>{this.props.ids[3][i]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                        <Text style={styles.tableCellLeft3}>{this.props.panels[i][4]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                        <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.panels[i][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                        <Text style={styles.tableCell}>{this.props.panels[i][1]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                        <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((totalVal) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                    </View>
                </View>)
            }
        }

        //Flashings/Packers
        for (var c = 0; c < this.props.flashings.length; c++)
            for (var i = 0; i < this.props.flashings[c].length; i++) {
                if (this.props.flashings[c][i][1] > 0) {
                    itemNumber += 1
                    //If there is 15 rows, create a new page (avoids page overrunning margin)
                    if (itemNumber % 15 == 0) {
                        pageNum++
                        if(index == 0)
                            fullItemTable[index] = <Page size="A4" wrap style={styles.page}>
                                <Text fixed style={styles.date}>{today}</Text>
                                <Text fixed style={styles.number}>{pageNum}</Text>
                                <View style={styles.table}>{fullItemTable[index]}</View>
                                </Page>
                        else
                            fullItemTable[index] = <Page size="A4" wrap style={styles.page}>
                                <Text fixed style={styles.date}>{today}</Text>
                                <Text fixed style={styles.number}>{pageNum}</Text>
                                <View style={styles.newTable}>{fullItemTable[index]}</View>
                            </Page>
                        index++
                        fullItemTable.push([])
                    }

                    var totalVal = ((Math.round((((((this.props.flashings[c][i][2])) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * this.props.flashings[c][i][1])
                    fullItemTable[index].push(<View style={styles.tableRow}>
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
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((this.props.flashings[c][i][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{this.props.flashings[c][i][1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((totalVal) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }
        //Now we add the rows at the bottom
        fullItemTable[index].push(<View style={styles.tableRow}>
            <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                <Text style={styles.tableCellLeft}></Text>
            </View>
            <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                <Text style={styles.tableCellLeftB}>{words[6][lang].toUpperCase()}</Text>
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
                <Text style={styles.tableCellB}>{this.props.currency[0]}{formatMoney((Math.round(((this.props.total) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
            </View>
        </View>)
        pageNum++
        //Add the final page (Often 1 or 2 pages in this table)
        if(index == 0)
            fullItemTable[index] = <Page size="A4" wrap style={styles.page}>
                <Text fixed style={styles.date}>{today}</Text>
                <Text fixed style={styles.number}>{pageNum}</Text>
                <View style={styles.table}>{fullItemTable[index]}</View>
                <Text style={styles.vatText}>{words[13][lang]} </Text>
            </Page>
        else
            fullItemTable[index] = <Page size="A4" wrap style={styles.page}>
                <Text fixed style={styles.date}>{today}</Text>
                <Text fixed style={styles.number}>{pageNum}</Text>
                <View style={styles.newTable}>{fullItemTable[index]}</View>
                <Text style={styles.vatText}>{words[13][lang]} </Text>
            </Page>


        //Now we create the final tables: the tables for each quote
        var tables = []
        var fullTables = []
        //Loop through quotes, then create a table in similar style to the full items table
        //Only difference being we're referencing the quotes and not the totals
        for (var i = 0; i < quotes.length; i++) {
            tables.push([])
            var index = 0
            tables[i].push([[]])
            tables[i][index][0].push( <View style={styles.tableRowBorderless}>
                <View style={styles.tableCol, { width: "40px", maxWidth: "40px" }}>
                    <Text style={styles.tableCellLeft3}></Text>
                    </View>
                    <View style={styles.tableCol, { width: "80px", maxWidth: "80px" }}>
                    <Text style={styles.tableCellLeft3}>{words[14][lang]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "200px", maxWidth: "200px" }}>
                    <Text style={styles.tableCellLeft3}>{words[15][lang]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCell}>{words[16][lang]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                    <Text style={styles.tableCell}>{words[12][lang]}</Text>
                    </View>
                    <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCell}>{words[6][lang] + " " + words[11][lang]}</Text>
                </View>
            </View>)
            var count = 0
            for (var c = 0; c < quotes[i].panels.length; c++) {
                if (quotes[i].panels[c][1] > 0) {
                    count++
                    var totalVal = ((Math.round((((((quotes[i].panels[c][3]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].panels[c][1])
                    tables[i][index].push(<View style={styles.tableRow}>
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
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].panels[c][3]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{quotes[i].panels[c][1] / quotes[i].quantity}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((totalVal / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString() , this.props.eur)}{this.props.currency[1]}</Text>
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
                    if (count % 13 == 0) {
                        pageNum++
                        if (index == 0)
                            tables[i][index] = <Page size="A4" wrap style={styles.page}>
                                <Text fixed style={styles.date}>{today}</Text>
                                <Text fixed style={styles.number}>{pageNum}</Text>
                                <View style={styles.heading2} ><Text style={styles.subTitle}>{words[17][lang] + " "} {i + 1}</Text></View>
                                <View style={styles.table}>{tables[i][index]}</View>
                            </Page>
                        else
                            tables[i][index] = <Page size="A4" wrap style={styles.page}>
                                <Text fixed style={styles.date}>{today}</Text>
                                <Text fixed style={styles.number}>{pageNum}</Text>
                                <View style={styles.newTable}>{tables[i][index]}</View>
                            </Page>
                        index++
                        tables[i].push([])
                    }

                    var totalVal = ((Math.round((((((quotes[i].flashingList[c][2]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].flashingList[c][1])
                    tables[i][index].push(<View style={styles.tableRow}>
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
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].flashingList[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{quotes[i].flashingList[c][1] / quotes[i].quantity}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((totalVal / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }

            for (var c = 0; c < quotes[i].packers.length; c++) {
                if (quotes[i].packers[c][1] > 0) {
                    count++
                    if (count % 13 == 0) {
                        pageNum++
                        tables[i][index].push(<View style={styles.tableRow} break />)
                        if (index == 0)
                            tables[i][index] = <Page size="A4" wrap style={styles.page}>
                                <Text fixed style={styles.date}>{today}</Text>
                                <Text fixed style={styles.number}>{pageNum}</Text>
                                <View style={styles.heading2} ><Text style={styles.subTitle}>{words[17][lang] + " "} {i + 1}</Text></View>
                                <View style={styles.table}>{tables[i][index]}</View>
                            </Page>
                        else
                            tables[i][index] = <Page size="A4" wrap style={styles.page}>
                                <Text fixed style={styles.date}>{today}</Text>
                                <Text fixed style={styles.number}>{pageNum}</Text>
                                <View style={styles.newTable}>{tables[i][index]}</View>
                            </Page>
                        index++
                        tables[i].push([])
                    }

                    var totalVal = ((Math.round((((((quotes[i].packers[c][2]) ) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100) * quotes[i].packers[c][1])
                    tables[i][index].push(<View style={styles.tableRow}>
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
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((((quotes[i].packers[c][2]) * (1 - (this.props.discount / 100)))) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "60px", maxWidth: "60px" }}>
                            <Text style={styles.tableCell}>{quotes[i].packers[c][1] / quotes[i].quantity}</Text>
                        </View>
                        <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                            <Text style={styles.tableCell}>{this.props.currency[0]}{formatMoney((Math.round(((totalVal / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                        </View>
                    </View>)
                }
            }
            //Add bottom bits
            tables[i][index].push(<View style={styles.tableRow}>
                <View style={styles.tableCol, { width: "450px", maxWidth: "450px" }}>
                    <Text style={styles.tableCellB}>{words[20][lang]}</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCellB}>{this.props.currency[0]}{formatMoney((Math.round((((((quotes[i].total))) / quotes[i].quantity) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                </View>
            </View>)
            tables[i][index].push(<View style={styles.tableRow}>
                <View style={styles.tableCol, { width: "450px", maxWidth: "450px" }}>
                    <Text style={styles.tableCellB}>{words[21][lang]}</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCellB}>{quotes[i].quantity}</Text>
                </View>
            </View>)
            tables[i][index].push(<View style={styles.tableRow}>
                <View style={styles.tableCol, { width: "450px", maxWidth: "450px" }}>
                    <Text style={styles.tableCellB}>{words[6][lang]}</Text>
                </View>
                <View style={styles.tableCol, { width: "70px", maxWidth: "70px" }}>
                    <Text style={styles.tableCellB}>{this.props.currency[0]}{formatMoney((Math.round(((quotes[i].total) + Number.EPSILON) * 100) / 100).toString(), this.props.eur)}{this.props.currency[1]}</Text>
                </View>
            </View>)
            //Add final page to array
            pageNum++
            if (index == 0)
                tables[i][index] = <Page size="A4" wrap style={styles.page}>
                    <Text fixed style={styles.date}>{today}</Text>
                    <Text fixed style={styles.number}>{pageNum}</Text>
                    <View style={styles.heading2} ><Text style={styles.subTitle}>{words[17][lang] + " "} {i + 1}</Text></View>
                    <View style={styles.table}>{tables[i][index]}</View>
                    <Text style={styles.vatText}>{words[13][lang]} </Text>
                </Page>
            else
                tables[i][index] = <Page size="A4" wrap style={styles.page}>
                    <Text fixed style={styles.date}>{today}</Text>
                    <Text fixed style={styles.number}>{pageNum}</Text>
                    <View style={styles.newTable}>{tables[i][index]}</View>
                    <Text style={styles.vatText}>{words[13][lang]} </Text>
                </Page>
            fullTables.push(tables[i])
        }

       
        //Finally we have our PDF document: the summaries with pictures, the total table and the tables for each quote
        this.generatePDFDocument((<Document>
            {summary}
            {fullItemTable}
            {fullTables}
        </Document>))
    }

    //This handles the actual file saving of the PDF
    generatePDFDocument = async (x) => {
        const blob = await pdf(
            x
      ).toBlob();

        var fileName = this.getFileName()
        

        saveAs(blob,  fileName );
    };



    //returns the name for the file
    getFileName() {
        var today = new Date();
        today.toISOString().substring(0, 10);
        return(this.props.name + " - " + today)
    }


    render() {
        const excel = this.excelExport()

        if (this.props.mobile) {
            //PDF not supported for these browsers
            if (isLegacyEdge && !isEdgeChromium) {
                return (<div style={{ width: "100px" }}>{excel}</div>)
            }
            else {
                //We have to check that we have one or more images for the pdf here because we have a second wait between adding a quote and taking the image in
                //The 'DisplayQuote.js' file. This is because immediately taking a picture just as the mini layout gets rendered to DOM results in undefined behaviour.
                if (this.props.imgs.length > 0) {
                    if ((this.state.multiDataSet.length == 0)) {
                        return (<div><img style={{ marginRight: "20px", width: "90px", cursor: "pointer" }} src={pdfImg} onClick={this.createPDF} />
                        </div>)
                    }
                    else {
                        return (<div><img style={{ marginRight: "20px", width: "90px", cursor: "pointer" }} src={pdfImg} onClick={this.createPDF} />
                            {excel}</div>)
                    }
                }
                return (<div><img style={{ marginRight: "20px", width: "90px", cursor: "not-allowed" }} src={pdfImg} />{excel}
                </div>)
            }
        }
        else {

            //PDF not supported for these browsers
            if (isLegacyEdge && !isEdgeChromium) {
                return (<div style={{ marginRight: "20px", marginLeft: "600px", width: "60px" }}>{excel}</div>)
            }
            else {
                //We have to check that we have one or more images for the pdf here because we have a second wait between adding a quote and taking the image in
                //The 'DisplayQuote.js' file. This is because immediately taking a picture just as the mini layout gets rendered to DOM results in undefined behaviour.
                if (this.props.imgs.length > 0) {
                    if ((this.state.multiDataSet.length == 0)) {
                        return (<div><img style={{ marginRight: "20px", marginLeft: "600px", width: "60px", cursor: "pointer" }} src={pdfImg} onClick={this.createPDF} />
                        </div>)
                    }
                    else {
                        return (<div><img style={{ marginRight: "20px", marginLeft: "600px", width: "60px", cursor: "pointer" }} src={pdfImg} onClick={this.createPDF} />
                            {excel}</div>)
                    }
                }
                return (<div><img style={{ marginRight: "20px", marginLeft: "600px", width: "60px", cursor: "not-allowed" }} src={pdfImg} />{excel}
                </div>)
            }
        }


    }
}


export default PDFDownload;