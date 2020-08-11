import React from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

//-----------------------------------------------------------------------

import Config from './Config/Config.js'
import Row from './components/Row.js'
import Button from 'react-bootstrap/Button';
import Window from './components/Window.js'
import Clear from './components/Clear.js'
import Orientation from './components/Orientation.js'
import DisplayQuote from './components/DisplayQuote.js'
import AddQuote from './components/AddQuote.js'
import SendQuote from './components/SendQuote.js'
import Form from './components/Form.js'
import PanelDropDown from './components/PanelDropDown.js'
import PDF from './components/PDF.js'
import NumQuote from './components/NumQuote.js'
import Discount from './components/Discount.js'
import languages from './Products/Languages.csv';
import PricePerWatt from './components/PricePerWatt.js'
import PackerDropDown from './components/Packers.js'
import ArraySize from './components/ArraySize'
import Language from './components/Language.js'
import KitSection from './components/KitSection.js'
import KWP from './components/KWP.js'
import CSVLoader from './Functions/CSVLoader.js'

//-----------------------------------------------------------------------

import './components/DropDown.css'
import './components/Fonts.css'
import './components/Row.css';
import './App.css';

//-----------------------------------------------------------------------

import ViridianIds from './Products/ViridianUKPrices.csv'
import Arrow from './Imgs/Arrow.png'

//-----------------------------------------------------------------------



//This 'App' class does most of the data processing and acts as kind of the omniscient being which tells
//The subcomponents what to do and when to do it.
class App extends React.Component {

    constructor(props) {
        super(props)
        //global variables
        this.state = {
            //type of each cell in grid (empty, solar, window)
            type: [[]],
            //starting length of each grid row 
            xLen: 13,
            //starting length of each grid column
            yLen: 8,


            //value for flashing in grid
            flashing: [[]],
            //list of P/L flashings in use: id, count, price, description
            flashings: [[]],
            //list of P/L flashings not in use: id, count, price, description
            secondFlashings: [[]],
            //list of packers: id, count, price, description
            packers: [[]],
            //list of panels: id, count, price, description, kWp
            panels: [[]],
            //holds the descriptions of items in different languages
            descriptions: [[]],
            Ids: [[]],
            //cell coordinate mouse was previously hovered over
            prevHover: [],
            //cell coordinate on mouse down
            downCell: [],
            //array of cells which turn grey when mouse drag
            marked: [[]],

            //whether the window box is selected
            window: false,
            //whether the panel orientation is landscape or not (if not, it's portrait)
            landscape: false,

            //if displaying the send form section
            send: false,

            //the list of quotes 
            Quotes: [],

            //the index of the type of panel being placed 
            currentPanel: 0,

            //index of the language being used
            language: 0,
            //index of the currency being used
            currency: 0,
            //the % discount (between 1 and 100)
            discount: 0,
            //the batten thickness
            packerWidth: 25,

            //holds the last cell which was hovered over whilst the window box was checked
            //which was surrounded by panels (i.e a window could be placed there)
            unblockedCell: [-1, -1, false],

            //says whether each arrow button should be enabled/disabled
            showArrow: [true, true, true, true],
            //says whether the popup should be displayed (only displayed after the add quote button is placed)
            showPopUp: false,

            //the config settings being used, changes with url query
            config: Config[0],

            xMin: 12
        }
        
        
        this.initGrid = this.initGrid.bind(this)
        this.quotePopUp = this.quotePopUp.bind(this)
        this.windowCellValid = this.windowCellValid.bind(this)
        this.changeLanguage = this.changeLanguage.bind(this)
        this.calculatekWp = this.calculatekWp.bind(this)
        this.arraySize = this.arraySize.bind(this)
        this.pricePer = this.pricePer.bind(this)
        this.calculatePackers = this.calculatePackers.bind(this)
        this.packerChange = this.packerChange.bind(this)
        this.discountChange = this.discountChange.bind(this)
        this.getLanguage = this.getLanguage.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.removeQuote = this.removeQuote.bind(this)
        this.panelChange = this.panelChange.bind(this)
        this.resizeFlashingGrid = this.resizeFlashingGrid.bind(this)
        this.cellDown = this.cellDown.bind(this)
        this.addQuote = this.addQuote.bind(this)
        this.sendQuote = this.sendQuote.bind(this)
        this.clearPress = this.clearPress.bind(this)
        this.cellUp = this.cellUp.bind(this)
        this.cellOver = this.cellOver.bind(this)
        this.cellPress = this.cellPress.bind(this)
        this.expandPress = this.expandPress.bind(this)
        this.windowPress = this.windowPress.bind(this)
        this.changeOrientation = this.changeOrientation.bind(this)
    }

    componentWillMount(){
        this.getLanguage()
        this.getProducts()
        this.initGrid()
        console.log(this.state.flashings)
        //get flashings from file
        if (isMobile) {
            if(this.state.xLen > 10)
                this.state.xLen = 8;
            this.state.xMin = 6;
        }
    }




    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                                      LANGUAGE, CONFIG, CSV AND GENERAL INITIALISATION/SETUP 
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




    //initializes the values representing the grid
    initGrid() {
            for (var i = 0; i < this.state.yLen; i++) {
                this.state.type.push(new Array(this.state.xLen))
                this.state.flashing.push(new Array(this.state.xLen))
                this.state.marked.push(new Array(this.state.xLen))
                for (var c = 0; c < this.state.xLen; c++) {
                    this.state.type[i][c] = 0
                    this.state.flashing[i][c] = "none"
                    this.state.marked[i][c] = false;
                }
            }
    }


    //checks the link query then assigns the correct language
    getLanguage() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        
        let id = params.get('id');
        var config;
        for (var i = 0; i < Config.length; i++) {
            if (Config[i].Id == id) {
                config = Config[i]
            }
        }
        if (config != null) {
            var lang = config.Language

            if (lang != null) {
                switch (lang) {
                    case "nl":
                        this.state.language = 1
                        this.state.currency = 1
                        break;
                    case "de":
                        this.state.language = 2
                        this.state.currency = 2
                        break;
                    case "no":
                        this.state.language = 3
                        this.state.currency = 3
                        break;
                }
            }
            this.state.config = config;

            var currency = config.Currency

            switch (currency) {
                case "GBP":
                    this.state.currency = 0
                    break;
                case "EURO":
                    this.state.currency = 1
                    break;
                case "KR":
                    this.state.currency = 2
                    break;
            }
        }
    }

    //when the user chooses to change the language
    changeLanguage(lang) {
        var descriptions = this.state.descriptions
        switch (lang) {
            case "English":
                this.state.language = 0
                break;
            case "Dutch":
                this.state.language = 1
                break;
            case "German":
                this.state.language = 2
                break;
            case "Norwegian":
                this.state.language = 3
                break;
        }
        var x =0
        if (this.state.landscape == true)
            x = 1
        for (var i = 0; i < this.state.flashings.length; i++) {
            this.state.flashings[i][3] = descriptions[x][i][this.state.language + 1]
        }
        for (var i = 0; i < this.state.secondFlashings.length; i++) {
            this.state.secondFlashings[i][3] = descriptions[(x+1)%2][i][this.state.language + 1]
        }
        for (var i = 0; i < this.state.packers.length; i++) {
            this.state.packers[i][3] = descriptions[2][i][this.state.language + 1]
        }
        for (var i = 0; i < this.state.panels.length; i++) {
            this.state.panels[i][4] = descriptions[3][i][this.state.language + 1]
        }
        this.setState({
            panels:this.state.panels
        })
    }

    //loads in the csv files and puts them into the relevent arrays
    getProducts() {
        var csvRoute = require("./Products/" + this.state.config.PriceList)
        var product = CSVLoader(csvRoute, 4, 2)
        var ViridianProd = CSVLoader(ViridianIds, 4, 2)
        var descriptions = CSVLoader(languages, 4, 5)
        
        //this array has the portrait, landscape and finally packer flashing
        //values & descriptions loaded into it
        var productArr = [[],[],[]]

        for (var c = 0; c < 3; c++) {
            this.state.Ids.push(new Array(product[c].length))
            for (var i = 0; i < product[c].length; i++) {
                if (product[c][i][0].length == 0)
                    break;
                productArr[c].push(new Array(4))
                productArr[c][i][0] = ViridianProd[c][i][0]
                this.state.Ids[c][i] = product[c][i][0]
                productArr[c][i][1] = 0
                productArr[c][i][2] = parseFloat(product[c][i][1])
                productArr[c][i][3] = descriptions[c][i][this.state.language + 1]
            }
        }

        //now to load the panel values
        var panelArr = []
        this.state.Ids.push(new Array(product[3].length))
        for (var i = 0; i < product[3].length; i++) {
            if (product[3][i][0] == "")
                break;
            panelArr.push(new Array(5))
            panelArr[i][0] = ViridianProd[3][i][0]
            this.state.Ids[3][i] = product[3][i][0]
            panelArr[i][1] = 0
            panelArr[i][2] = parseFloat(product[3][i][2])
            panelArr[i][3] = parseFloat(product[3][i][1])
            panelArr[i][4] = descriptions[3][i][this.state.language + 1]
        }

        //finally, set the values
        this.state.flashings = productArr[0]
        this.state.secondFlashings = productArr[1]
        this.state.panels = panelArr
        this.state.packers = productArr[2]
        this.state.descriptions = descriptions
    }




    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                                  GRID LOGIC, FLASHING/PACKER/PANEL LOGIC, THE MEAT OF THE CONFIGUARTOR
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





    //checks if you can place a velux window in the specific coordinates
    //returns true if surrounded by panels (this might change in future)
    checkVeluxValid(temp, x, y) {
        var window = true
        if (x == 0 || x >= this.state.yLen - 1 || y == 0 || y >= this.state.xLen - 1)
            return false
        for (var i = -1; i < 2; i++)
            for (var c = -1; c < 2; c++)
                if (temp[x + i][y + c] != 1 && !(i == 0 && c == 0))
                    window = false
       
        return window
    }

    //checks if the current cell being hovered over can have a window placed
    windowCellValid(x, y) {
        if (this.state.window == true) {
            if (this.checkVeluxValid(this.state.type, x, y))
                this.setState({ unblockedCell: [x, y, true] })
            else
                this.setState({ unblockedCell: [-1, -1, false] })
        }
    }


    //changes the cell type when clicked
    //for example, from empty cell to a cell with a panel in
    cellPress(y, x) {
        var temp = this.state.type
        //if placing a velux window, otherwise
        if (this.state.window == true) {
            var window = this.checkVeluxValid(temp, x, y)
            if (temp[x][y] == 2) {
                temp[x][y] = 0;
                this.flashingLogic(x, y)
                this.setState({
                    type: temp
                })
            }
            else 
            if (window) {
                if (temp[x][y] == 1) {
                    this.state.panels[this.state.currentPanel][1] -= 1
                }
                temp[x][y] = 2
                this.flashingLogic(x, y)
                this.setState({
                    type: temp
                })
            }
        }
        else {
            temp[x][y] = ((this.state.type[x][y] + 1) % 2)
            if (temp[x][y] == 1)
                this.state.panels[this.state.currentPanel][1] += 1
            else
                this.state.panels[this.state.currentPanel][1] -= 1
            this.setState({
                type: temp
            })
            this.flashingLogic(x, y)
        }
        //calculate packers after doing the flashing logic
        this.calculatePackers()
    }

    //marks the cell on mouse down
    cellDown(y, x) {
        this.state.downCell = [x, y];
    }

    //if mouse is down and hovering over a cell, this gets triggered
    //in order to create grey square of selected cells from starting cell
    //to the current cell the mouse is over
    cellOver(x, y) {
        var lowerx, lowery, upperx, uppery
        let prevHover = this.state.prevHover
        let downCell = this.state.downCell
        upperx = Math.max(this.state.downCell[1], x)
        uppery = Math.max(this.state.downCell[0], y)
        lowerx = Math.min(this.state.downCell[1], x)
        lowery = Math.min(this.state.downCell[0], y)
        //this checks if the previous y & x coords are further from the starting cell
        //than the current coords, if so it unselects the cells which aren't part of the
        //square selection
        if (this.state.prevHover != null) {
            if (Math.abs(prevHover[0] - downCell[0]) > Math.abs(y - downCell[0])) {
                var c = prevHover[0]
                var inc
                if (prevHover[0] > y)
                    inc = -1
                else
                    inc = 1
                while (c != y) {
                    for (var i = 0; i < this.state.yLen; i++) 
                        this.state.marked[i][c] = false;
                    c += inc
                }
            }
            if (Math.abs(prevHover[1] - downCell[1]) > Math.abs(x - downCell[1])) {
                var c = prevHover[1]
                var inc
                if (prevHover[1] > x)
                    inc = -1
                else
                    inc = 1
                while (c != x) {
                    for (var i = 0; i < this.state.xLen; i++)
                        this.state.marked[c][i] = false;
                    c += inc
                }
            }
        }
        //selects the current cells
        for (var i = lowerx; i <= upperx; i++)
            for (var c = lowery; c <= uppery; c++)
                this.state.marked[i][c] = true;
       
        this.setState({
            marked: this.state.marked,
            prevHover: [y,x]
        })
    }

    //creates a square of cells from where the mouse is up
    cellUp(x, y) {
        var lowerx, lowery, upperx, uppery
        upperx = Math.max(this.state.downCell[0], x)
        uppery = Math.max(this.state.downCell[1], y)
        lowerx = Math.min(this.state.downCell[0], x)
        lowery = Math.min(this.state.downCell[1], y)
        if (this.state.downCell[0] != x && this.state.downCell[1] != y)
            this.state.unblockedCell = [-1, -1]
        //unmark cells
        for (var i = 0; i < this.state.yLen; i++)
            for (var c = 0; c < this.state.xLen; c++) 
                this.state.marked[i][c] = false;
        //press cells
        for (var i = lowerx; i <= upperx; i++)
            for (var c = lowery; c <= uppery; c++)
                this.cellPress(i, c)
    }

    //clears/resets all the cells
    clearPress() {
        this.state.unblockedCell = [-1, -1]
        var flashVals = this.state.flashings
        var flashings = this.state.flashing
        var types = this.state.type
        //reset grid
        for (var i = 0; i < this.state.yLen; i++)
            for (var c = 0; c < this.state.xLen; c++) {
                types[i][c] = 0
                flashings[i][c] = "none"
            }
        //reset flashing values
        for (var i = 0; i < flashVals.length; i++) {
            flashVals[i][1] = 0
        }
        //reset panel values
        for (var i = 0; i < this.state.panels.length; i++)
            this.state.panels[i][1] = 0
        //set state and recalculate packers (to 0)
        this.setState({
            flashings: flashVals,
            flashing: flashings,
            type: types
        })
        this.calculatePackers()
    }

    //expands the grid when corresponding button is clicked
    //currently can expand up to 30 cells and resize down to 13,8 cells
    expandPress(expand, by) {
        if (by == null)
            by = 1 
        var temp = this.state.type
        var xTemp = this.state.xLen
        var yTemp = this.state.yLen
        var flashing = this.state.flashing
        var marked = this.state.marked
        switch (expand) {
            case 0:
                //ensure grid isn't too big
                for (var m = 0; m < by; m++) {
                    if (xTemp < 30) {
                        this.state.showArrow[0] = true
                        for (var i = 0; i < yTemp; i++) {
                            temp[i].push([])
                            flashing[i].push([])
                            marked[i].push([])
                        }
                        for (var i = 0; i < yTemp; i++) {
                            temp[i][xTemp] = 0
                            flashing[i][xTemp] = "none"
                            marked[i][xTemp] = false
                        }
                        if (xTemp == 30)
                            this.state.showArrow[0] = false
                        xTemp += 1
                    }
                }
                break;

            case 1:
                //recalculate cells bordering the column we are removing
                for (var m = 0; m < by; m++) {
                    if (xTemp > this.state.xMin) {
                        this.state.showArrow[1] = true;
                        for (var i = 0; i < yTemp; i++) {
                            if (temp[i][xTemp - 1] != 0) {
                                if (temp[i][xTemp - 1] == 1)
                                    this.state.panels[this.state.currentPanel][1] -= 1
                                temp[i][xTemp - 1] = 0
                                this.flashingLogic(i, xTemp - 1)
                            }
                        }

                        for (var i = 0; i < yTemp; i++) {
                            temp[i].pop()
                            flashing[i].pop()
                            marked[i].pop()
                        }
                        xTemp -= 1
                        if (xTemp == this.state.xMin)
                            this.state.showArrow[0] = false
                    }
                }
                break;
            case 2:
                for (var m = 0; m < by; m++) {
                    if (yTemp < 30) {
                        this.state.showArrow[2] = true
                        temp.push(new Array(xTemp))
                        flashing.push(new Array(xTemp))
                        marked.push(new Array(xTemp))
                        for (var i = 0; i < xTemp; i++) {
                            temp[yTemp][i] = 0
                            flashing[yTemp][i] = "none"
                            marked[yTemp][i] = false
                        }
                        yTemp += 1
                        if (yTemp == 30)
                            this.state.showArrow[3] = false
                    }
                }
                break;
            case 3:
                //recalculate cells bordering the row we are removing
                for (var m = 0; m < by; m++) {
                    if (yTemp > 7) {
                        this.state.showArrow[3] = true
                        for (var i = 0; i < xTemp; i++) {
                            if (temp[yTemp - 1][i] != 0) {
                                if (temp[yTemp - 1][i] == 1)
                                    this.state.panels[this.state.currentPanel][1] -= 1
                                temp[yTemp - 1][i] = 0
                                this.flashingLogic(yTemp - 1, i)
                            }
                        }
                        marked.pop()
                        temp.pop()
                        flashing.pop()
                        yTemp -= 1
                        if (yTemp == 7)
                            this.state.showArrow[2] = false
                    }
                }
                break;
        }
        this.setState({
            type: temp,
            xLen: xTemp,
            yLen: yTemp,
            marked: marked
        })
    }

    //calculations for the packers
    calculatePackers() {
        let width = this.state.packerWidth
        let landscape = this.state.landscape
        var packers = this.state.packers
        let flashing = this.state.flashings
        if (width > 25) {

            if (landscape == false) {
                packers[0][1] = Math.ceil((((flashing[0][1] + flashing[1][1] + flashing[2][1] + flashing[5][1]) * 4) + flashing[11][1] * 2) * ((width - 25) / 5) / 20)
            }
            else {
                packers[0][1] = Math.ceil(((flashing[0][1] + flashing[1][1] + flashing[2][1] + flashing[5][1]) * 4) * ((width - 25) / 5) / 20)
            }
            packers[1][1] = Math.ceil(((flashing[3][1] + flashing[4][1]) * 2) * ((width - 25) / 5) / 20)

            for (var i = 2; i < packers.length; i++)
                packers[i][1] = 0
        }
        else {
            if (width == 0) {
                var x = 4
                packers[0 + x][1] = flashing[0][1]
                packers[1 + x][1] = flashing[1][1]
                packers[2 + x][1] = flashing[2][1]
                packers[3 + x][1] = flashing[3][1]
                packers[4 + x][1] = flashing[4][1]
                packers[5 + x][1] = flashing[5][1]
                packers[6 + x][1] = flashing[9][1]

                for (var i = 0; i < 4; i++)
                    packers[i][1] = 0
            }
            else {
                if (width == 22) {
                    if (!landscape) {
                        packers[2][1] = Math.ceil((((flashing[0][1] + flashing[1][1] + flashing[2][1] + flashing[5][1]) * 4) + flashing[11][1] * 2) / 20)
                        packers[3][1] = Math.ceil(((flashing[3][1] + flashing[4][1]) * 2) / 20)
                    }
                    else {
                        packers[2][1] = Math.ceil(((flashing[0][1] + flashing[1][1] + flashing[2][1] + flashing[5][1]) * 6) / 20)
                        packers[3][1] = Math.ceil(((flashing[3][1] + flashing[4][1]) * 3) / 20)
                    }
                    for (var i = 4; i < packers.length; i++)
                        packers[i][1] = 0
                    packers[0][1] = 0
                    packers[1][1] = 0
                }
                else {
                    for (var i = 0; i < packers.length; i++)
                        packers[i][1] = 0
                }
            }
        }
        this.setState({
            packers: packers
        })
    }

    //removes/adds a flashing item from/to the total
    changeFlash(x, flash) {
        var totalFlash = []
        var temp = ""
        var tempFlashing = this.state.flashings
        //sometimes we have more than one flashing in a cell,
        //handle it
        for (var i = 0; i < flash.length; i++) {
            if (flash[i] == ' ') {
                totalFlash.push(temp)
                temp = ""
            }
            else
                temp += flash[i]
        }
        totalFlash.push(temp)

        //loop through flashings and find the correct one, 
        //then add or remove 1 to the total
        for (var i = 0; i < totalFlash.length; i++) {
            for (var c = 0; c < tempFlashing.length; c++) {
                if (tempFlashing[c][0] == totalFlash[i]) {
                    tempFlashing[c][1] += x
                }
            }
        }

        this.setState({
            flashings: tempFlashing
        })
    }

    //does the beef of the calculations when a cell is clicked
    flashingLogic(x, y) {
        var tempType = this.state.type
        var tempFlash = this.state.flashing
        var flashList = this.state.flashings

        //loop through each cell in 9 cell block
        for (var i = -1; i < 2; i++) {
            for (var c = -1; c < 2; c++) {
                var temp = []
                //loop through surrounding cells of each cell and create an array
                //of 'type' values that we can then perform logic on
                for (var n = -1; n < 2; n++) {
                    temp.push(new Array(3))
                    for (var g = -1; g < 2; g++) {
                        if ((x + i + n) >= this.state.yLen || (x + i + n) < 0 || (y + c + g) >= this.state.xLen || (y + c + g) < 0)
                            temp[n + 1][g + 1] = 0;
                        else
                            temp[n + 1][g + 1] = (tempType[x + i + n][y + c + g])
                    }
                }

                //if panel is within the grid
                if ((x + i) < this.state.yLen && (x + i) >= 0 && (y + c) < this.state.xLen && (y + c) >= 0) {
                    if (temp[1][1] != 2) {
                        if (temp[1][1] == 1) {
                            //TR, TC, J 
                            var flashItem = ""
                            if (temp[1][0] != 0) {
                                if (temp[2][1] != 0)
                                    flashItem = flashList[4][0]
                                else if (temp[1][2] != 0)
                                    flashItem = flashList[1][0]
                                else
                                    flashItem = flashList[2][0]

                            }
                            else {
                                //TY, TL
                                if (temp[1][2] != 0) {
                                    if (temp[2][1] != 0)
                                        flashItem = flashList[3][0]
                                    else
                                        flashItem = flashList[0][0]
                                }
                                else {
                                    if (temp[2][1] != 0)
                                        flashItem = flashList[3][0]
                                    else
                                        flashItem = flashList[5][0]
                                }
                            }
                            var prevFlash = tempFlash[x + i][y + c]
                            if (prevFlash != "none")
                                this.changeFlash(-1, prevFlash)

                            tempFlash[x + i][y + c] = flashItem
                            this.changeFlash(1, flashItem)


                        }
                        else {
                            //If no panel in square, check for corners (can have multiple corners for one location)
                            var corners = ""
                            if (temp[1][2] != 0 && temp[2][1] != 0 && temp[2][2] != 0)
                                corners += flashList[6][0]
                            if (temp[1][0] != 0 && temp[2][0] != 0 && temp[2][1] != 0) {
                                if (corners.length > 0)
                                    corners += " "
                                corners += flashList[7][0]
                            }
                            if (temp[1][2] != 0 && temp[0][2] != 0 && temp[0][1] != 0 && temp[0][0] == 0) {
                                if (corners.length > 0)
                                    corners += " "
                                corners += flashList[10][0]
                            }
                            if (temp[0][0] != 0 && temp[0][1] != 0 && temp[1][0] != 0) {
                                if (corners.length > 0)
                                    corners += " "
                                corners += flashList[8][0]
                            }
                            if (temp[0][0] != 0 && temp[0][1] != 0 && temp[0][2] != 0 && temp[1][2] != 0) {
                                if (corners.length > 0)
                                    corners += " "
                                corners += flashList[9][0]
                            }
                            if (corners == "")
                                corners = "none"
                            else
                                this.changeFlash(1, corners)

                            if (tempFlash[x + i][y + c] != "none" && tempFlash[x + i][y + c] != null)
                                this.changeFlash(-1, tempFlash[x + i][y + c])

                            tempFlash[x + i][y + c] = corners
                        }
                    }
                    else {
                        var window = this.checkVeluxValid(tempType, x + i, y + c)
                        flashItem = flashList[11][0]
                        if (window == false || tempFlash[x + i][y + c] == flashItem) {
                            this.changeFlash(-1, tempFlash[x + i][y + c])
                            tempFlash[x + i][y + c] = "none"
                            this.state.flashing[x + i][y + c] = "none"
                            this.state.type[x + i][y + c] = 0
                            this.flashingLogic(x + i, y + c)
                        }
                        else {
                            var prevFlash = tempFlash[x + i][y + c]
                            if (prevFlash != "none")
                                this.changeFlash(-1, prevFlash)
                            tempFlash[x + i][y + c] = flashItem
                            this.changeFlash(1, flashItem)
                        }
                    }
                }

            }
        }
        this.setState({
            flashing: tempFlash
        })
    }



    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                     BUTTON PRESSES, DROPDOWN PRESSES, ANY INTERACTION WITH ELEMENTS WHICH CHANGE A FEW SETTINGS GOES HERE
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    //allows the user to add a velux roof window to the array
    windowPress() {
        if (this.state.landscape == false)
            this.setState({
                window:!this.state.window
            })
    }

    //changes the type of panel which is being placed down in the array
    panelChange(id) {
        var temp = this.state.panels
        if (id != this.state.currentPanel) {
            temp[id][1] = temp[this.state.currentPanel][1]
            temp[this.state.currentPanel][1] = 0
        }
        this.setState({
            panels: temp,
            currentPanel: id
        })
    }

    //changes the orientation of the panels
    changeOrientation() {
        var temp = [];
        //create physical copy of one panel array as we'll be swapping them both
        //so don't want it to be by reference

        if (isMobile) {
            if (!this.state.landscape)
                this.expandPress(1, 2)
            else
                this.expandPress(0, 2)
        }

        for (var i = 0; i < this.state.flashings.length; i++) {
            temp.push(new Array(4))
            for (var c = 0; c < 4; c++)
                temp[i][c] = this.state.flashings[i][c]
        }
        this.state.flashings = this.state.secondFlashings
        this.state.secondFlashings = temp
        this.state.landscape = !this.state.landscape

        

        this.setState({
            window: false
        })
        //we want to clear the cells after this has been done
        this.clearPress()
    }

    quotePopUp() {
        this.setState({
            showPopUp: true
        })
    }

    //sets the send quote form to visible
    sendQuote() {
        this.setState({
            send: true
        });
    }

    //changes the discount value
    discountChange(x) {
        this.setState({
            discount: x
        })
    }

    //changes the batten thickness
    packerChange(x) {
        this.state.packerWidth = x
        this.calculatePackers()
    }


    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                                                 QUOTE SAVING, LOADING & DISPLAYING
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    //this function is to resize the flashing grid so that
    //no unnecessary blank rows or columns are showing when the user
    //gets shown a mini preview of the grid when looking at past quotes
    resizeFlashingGrid() {
        var resize = this.state.flashing
        var dimensions = []

        //find near row, then near column, then far row, then far column
        for (var i = 0; i < this.state.yLen; i++)
            for (var c = 0; c < this.state.xLen; c++) {
                if (resize[i][c] != "none" && resize[i][c] != null) {
                    dimensions.push(i)
                    i = this.state.yLen + 1
                    break;
                }
            }
        for (var i = 0; i < this.state.xLen; i++)
            for (var c = 0; c < this.state.yLen; c++) {
                if (resize[c][i] != "none" && resize[c][i] != null) {
                    dimensions.push(i)
                    i = this.state.xLen+1
                    break;
                }
            }
        for (var i = this.state.yLen - 1; i >= 0; i--)
            for (var c = 0; c < this.state.xLen; c++) {
                if (resize[i][c] != "none" && resize[i][c] != null) {
                    dimensions.push(i)
                    i = -1
                    break;
                }
            }
        for (var i = this.state.xLen; i >= 0; i--)
            for (var c = 0; c < this.state.yLen; c++) {
                if (resize[c][i] != "none" && resize[c][i] != null) {
                    dimensions.push(i)
                    i = -1
                    break;
                }
            }
        var resizedArray = []
        for (var i = dimensions[0]; i <= dimensions[2]; i++) {
            resizedArray.push(new Array(dimensions[3] - dimensions[1] +1))
            for (var c = dimensions[1]; c <= dimensions[3]; c++) {
                resizedArray[i - dimensions[0]][c - dimensions[1]] = resize[i][c]
            }
        }
        //calculate dimensions of resized array, then return
        var xSize = dimensions[3] - dimensions[1] + 1
        var ySize = dimensions[2] - dimensions[0] + 1
        return [resizedArray, xSize, ySize]
    }

    

    //adds a new quote to the list of added quotes
    addQuote(number) {
        //crop the flashing grid
        var [mini, xSize] = this.resizeFlashingGrid()

        //copy flashing items over
        let flashTemp=this.state.flashings
        var flashCopy = []
        var itemTotal = 0
        for (var i = 0; i < flashTemp.length; i++) {
            flashCopy.push(new Array(4))
            flashCopy[i][0] = flashTemp[i][0]
            flashCopy[i][1] = flashTemp[i][1]*number
            flashCopy[i][2] = flashTemp[i][2]
            flashCopy[i][3] = flashTemp[i][3]
            itemTotal += flashCopy[i][1] * flashTemp[i][2]
        }

        //copy packers over
        let packerTemp = this.state.packers
        var packersCopy = []
        let tempWidth = this.state.packerWidth
        for (var i = 0; i < packerTemp.length; i++) {
            packersCopy.push(new Array(4))
            packersCopy[i][0] = packerTemp[i][0]
            packersCopy[i][1] = packerTemp[i][1] * number
            packersCopy[i][2] = packerTemp[i][2]
            packersCopy[i][3] = packerTemp[i][3]
            itemTotal += packersCopy[i][1] * packerTemp[i][2]
        }

        //copy panels over
        let panelTemp = this.state.panels
        var panelsCopy = []
        var panelTotal = 0
        for (var i = 0; i < panelTemp.length; i++) {
            panelsCopy.push(new Array(5))
            panelsCopy[i][0] = panelTemp[i][0]
            panelsCopy[i][1] = panelTemp[i][1] * number
            panelsCopy[i][2] = panelTemp[i][2]
            panelsCopy[i][3] = panelTemp[i][3]
            panelsCopy[i][4] = panelTemp[i][4]
            panelTotal += panelsCopy[i][1] * panelTemp[i][3]
        }

        var temp = this.state.Quotes
        //a quote contains: flashing items, flashing total, orientation, packers, panels, panel total, 
        temp.push({
            key: temp.length,
            //flashing items
            flashingList: flashCopy,
            //panels 
            panels: panelsCopy,
            //packers
            packers: packersCopy,
            //orientation
            landscape: this.state.landscape,
            //total cost of the quote
            total: itemTotal + panelTotal,
            //cropped grid of flashing items to be displayed
            miniFlashing: mini,
            // number of columns of the cropped grid
            xSize: xSize,
            //batten thickness 
            width: tempWidth,
            //number of this particular quote/array added
            quantity: number
        })
        this.setState({
            Quotes: temp,
            showPopUp: false
        })
        this.clearPress()
    }

    

    //creates a new array of panel items, with quantity set to '0'
    createEmptyPanels(totalPanels) {
        var temp = this.state.panels
        for (var i = 0; i < temp.length; i++) {
            totalPanels.push(new Array(5))
            totalPanels[i][0] = temp[i][0]
            totalPanels[i][1] = 0
            totalPanels[i][2] = temp[i][2]
            totalPanels[i][3] = temp[i][3]
            totalPanels[i][4] = temp[i][4]
        }
    }

    //totals landscape and portrait flashings 
    //rewrite this?
    totalQuotes(currentTotal, newQuote) {
        var start = 0
        if (newQuote.landscape == true)
            start = 1
        

        if (currentTotal.length <1) {
            currentTotal = [[], [],[]]
            if (this.state.landscape == true) {
                var temp = this.state.secondFlashings
                var temp2 = this.state.flashings
            }
            else {
                var temp = this.state.flashings
                var temp2 = this.state.secondFlashings
            }
            var temp3 = this.state.packers

            for (var i = 0; i < temp.length; i++) {
                currentTotal[0].push(new Array(4))
                currentTotal[0][i][0] = temp[i][0]
                currentTotal[0][i][1] = 0
                currentTotal[0][i][2] = temp[i][2]
                currentTotal[0][i][3] = temp[i][3]
            }
            for (var i = 0; i < temp2.length; i++) {
                currentTotal[1].push(new Array(4))
                currentTotal[1][i][0] = temp2[i][0]
                currentTotal[1][i][1] = 0
                currentTotal[1][i][2] = temp2[i][2]
                currentTotal[1][i][3] = temp2[i][3]
            }
            //packers
            for (var i = 0; i < temp3.length; i++) {
                currentTotal[2].push(new Array(4))
                currentTotal[2][i][0] = temp3[i][0]
                currentTotal[2][i][1] = 0
                currentTotal[2][i][2] = temp3[i][2]
                currentTotal[2][i][3] = temp3[i][3]
            }
        }
        for (var i = 0; i < newQuote.flashingList.length; i++) {
            currentTotal[start][i][1] += newQuote.flashingList[i][1]
        }
        for (var i = 0; i < newQuote.packers.length; i++) {
            currentTotal[2][i][1] += newQuote.packers[i][1]
        }

        return currentTotal
    }

    //removes a given quote
    removeQuote(index) {
        var temp = this.state.Quotes
        temp.splice(index, 1)
        this.setState({
            Quote: temp
        })
    }


    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                                        FINAL BITS AND PIECES (CALCULATING kWp, PPW, Currency & size of the array being created)
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    //crops the flashing grid, then returns the column and row length
    arraySize() {
        var resize = this.resizeFlashingGrid()
        var xLength = resize[1] 
        var yLength = resize[2] 
        if (isNaN(xLength)) {
            xLength = 0
            yLength = 0
        }
        return[xLength, yLength]
    }

    

    //calculates the price per watt
    pricePer(total, panels) {
        if (total != null) {
            var ppwTotal = total
            var ppwPanels = []
            for (var i = 0; i < this.state.flashings.length; i++) {
                ppwTotal += this.state.flashings[i][1] * this.state.flashings[i][2]
            }
            this.createEmptyPanels(ppwPanels)

            for (var i = 0; i < this.state.packers.length; i++) {
                ppwTotal += this.state.packers[i][1] * this.state.packers[i][2]
            }

            for (var i = 0; i < this.state.panels.length; i++) {
                ppwPanels[i][1] += panels[i][1]
                ppwPanels[i][1] += this.state.panels[i][1]
                ppwTotal += this.state.panels[i][1] * this.state.panels[i][3]
            }
            ppwTotal -= (ppwTotal * this.state.discount / 100)
            return [ppwTotal, ppwPanels]
        }
        else {
            var ppwTotal = 0
            for (var i = 0; i < this.state.flashings.length; i++) {
                ppwTotal += this.state.flashings[i][1] * this.state.flashings[i][2]
            }
            for (var i = 0; i < this.state.packers.length; i++) {
                ppwTotal += this.state.packers[i][1] * this.state.packers[i][2]
            }
            for (var i = 0; i < this.state.panels.length; i++) {
                ppwTotal += this.state.panels[i][1] * this.state.panels[i][3]
            }
            ppwTotal -= (ppwTotal * this.state.discount/100)
            return [ppwTotal, this.state.panels]
        }
        return null
    }

    //returns the currency characters 
    calculateCurrency() {
        var before, after
        switch (this.state.currency) {
            case 0:
                before = String.fromCharCode('163')
                break;
            case 1:
                before = '\u20AC'
                break;
            case 2:
                after = " kr"
                break;

        }
        return [before,after]
    }

    //calculates the kWp
    calculatekWp() {
        var kwp = 0
        if (this.state.Quotes != null) {
            for (var i = 0; i < this.state.Quotes.length; i++) {
                for (var c = 0; c < this.state.Quotes[i].panels.length; c++) {
                    kwp += this.state.Quotes[i].panels[c][1] * this.state.Quotes[i].panels[c][2]
                }
            }
        }
        for (var c = 0; c < this.state.panels.length; c++) {
            kwp += this.state.panels[c][1] * this.state.panels[c][2]

        }
        return kwp/1000
    }



    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //                                                                                              RENDERING TO SCREEN
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    //renders the whole screen by sending relevent info down to sub components and placing them
    //in the right order
    render() {
        //if window is true, load this variable which says whether the cell being hovered over 
        //can have a window placed in it or not
        var unblockedCell = [-1, -1]
        if (this.state.window == true) {
            unblockedCell = this.state.unblockedCell
        }

        var mobile = false
        if (isMobile) {
            mobile = true
        }

        //create the main grid
        var grid = []
        for (var i = 0; i < this.state.yLen; i++)
            grid.push(<div style={{ marginTop: 0, marginBottom: 0, fontSize: 0 }}><Row mobile={mobile} key={i} window={this.windowCellValid} wind={this.state.window} unblock={unblockedCell} showArrow={this.state.showArrow} expandPress={this.expandPress} ySize={this.state.yLen} xSize={this.state.xLen} type={this.state.type[i]} flashing={this.state.flashing[i]} cellPress={this.cellPress} row={i} down={this.cellDown} up={this.cellUp} landscape={this.state.landscape} cellOver={this.cellOver} marked={this.state.marked[i]} /></div>)

        //current currency in use (£100 or 1000kr for example)
        var currency = this.calculateCurrency()

        //if there is one or more quotes, quote information will be calculated and displayed
        var send
        var quotes = []
        var pdf
        if (this.state.Quotes.length > 0) {
            send = <SendQuote press={this.sendQuote} />
            var summary = []
            var half = summary.length
            var overallTotal = 0
            var totalPanels = []
            this.createEmptyPanels(totalPanels)
            //loop through quotes, totalling the panel & flashing: costs, totals ect
            for (var i = 0; i < this.state.Quotes.length; i++) {
                quotes.push(<DisplayQuote id={i + 1} currency={currency} quantity={this.state.Quotes[i].quantity} remove={this.removeQuote} discount={this.state.discount} total={this.state.Quotes[i].total} flashings={this.state.Quotes[i].flashingList} landscape={this.state.Quotes[i].landscape} miniFlashing={this.state.Quotes[i].miniFlashing} xSize={this.state.Quotes[i].xSize} panels={this.state.Quotes[i].panels} packers={this.state.Quotes[i].packers} width={this.state.Quotes[i].width} />)
                summary = this.totalQuotes(summary, this.state.Quotes[i], half)
                overallTotal += this.state.Quotes[i].total
                for (var c = 0; c < this.state.Quotes[i].panels.length; c++) {
                    totalPanels[c][1] += this.state.Quotes[i].panels[c][1]
                }
            }
            pdf = <PDF ids={this.state.Ids} send={send} currency={currency} total={overallTotal} flashings={summary} discount={this.state.discount} panels={totalPanels} Quotes={this.state.Quotes} />
        }

        //calculate price per watt & kWp 
        var priceP = this.pricePer(overallTotal, totalPanels)
        var ppwTotal = priceP[0]
        var ppwPanels = priceP[1]
        var kwp = this.calculatekWp();

        //arrows below grid to expand and reduce the number of rows
        var bottomArrows = []
        bottomArrows.push(<div className="button2" style={{ display: "flex", flexDirection: "row", flexShrink: "0", marginTop: "-5px", marginLeft: "36%", marginRight: "7%" }}> <Button variant="primary" disabled={!this.state.showArrow[3]} className="button" onClick={() => this.expandPress(2)} style={{ width: "40px", height: "40px" }}><img src={Arrow} className="button2" style={{ transform: "rotate(90deg)", marginLeft: "-12px", marginTop: "-6px", width: "40px", height: "40px", padding: "10px" }} /></Button></div>)
        bottomArrows.push(<div className="button2" style={{ display: "flex", flexDirection: "row", flexShrink: "0", marginTop: "-5px" }}> <Button variant ="primary" disabled={!this.state.showArrow[2]} className="button" onClick={() => this.expandPress(3)} style={{ width: "40px", height: "40px" }}><img src={Arrow} className="button2" style={{ transform: "rotate(270deg)", marginLeft: "-12px", marginTop:"-6px", width: "40px", height: "40px", padding: "10px" }} /></Button></div>)

        var logo1 = <img style={{ width: "120px", marginLeft: "10%", marginTop: "1%", marginBottom: "-2%" }} src={require("./Imgs/" + this.state.config.Logo1)} />
        var logo2 = null
        if (this.state.config.Logo2 != null)
            logo2 = <img style={{ width: "120px", marginLeft: "1%", marginTop: "1%", marginBottom: "-2%" }} src={require("./Imgs/" + this.state.config.Logo2)} />
        var logo3 = <img style={{ width: "200px", marginLeft: "auto", marginRight: "1%", marginTop: "40px", marginBottom: "-1%" }} src={require("./Imgs/" + this.state.config.Logo3)} />
        var title = <h1 className="TitleFont" style={{ marginTop: "-25px" }}> {this.state.config.Title} </h1>

        //if not displaying the send form, display the configurator
        if (!mobile) {
            if (this.state.send == false) {
                return (
                    <div className="app">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {logo1}
                            {logo2}
                        </div>
                        <Language press={this.changeLanguage} language={this.state.language} />
                        {logo3}
                        <div className="outerDivCenter">
                            {title}
                            <Discount discount={this.discountChange} />
                        </div>
                        <div className="WorkSpace">
                            <div className="outerDivCenter">
                                <div style={{ marginTop: "30px", display: "flex", flexDirection: "row" }}>
                                    <Orientation press={this.changeOrientation} landscape={this.state.landscape} />
                                    <div className="DropDown">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <PanelDropDown ids={this.state.Ids[3]} press={this.panelChange} panels={this.state.panels} />
                                            <PackerDropDown press={this.packerChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="TableUnder" style={{ width: "100%" }}>
                                    <div className="TableHeader" style={{ width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <KWP kwp={kwp} />
                                            <PricePerWatt currency={currency} panels={ppwPanels} total={ppwTotal} />
                                            <ArraySize size={this.arraySize()} landscape={this.state.landscape} />
                                        </div>
                                    </div>
                                    {grid}
                                </div>
                                <p></p>
                                <div className="horizontal">
                                    {bottomArrows}
                                </div>
                                <div className="horizontal">
                                    <AddQuote press={this.quotePopUp} />
                                    <Clear press={this.clearPress} />
                                </div>
                                <Window press={this.windowPress} landscape={this.state.landscape} />
                            </div>
                        </div>
                        <div className="outerDivCenter" style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <KitSection flashings={this.state.flashings} ids={this.state.Ids} packers={this.state.packers} />
                        </div>
                        <div className="WorkSpace">
                            <div className="outerDivCenter" style={{ marginTop: "20px", marginBottom: "10px" }}>
                                {quotes}
                            </div>
                        </div>
                        <div className="WorkSpace2">
                            <div className="outerDivCenter" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <div id="divToPrint">{pdf}
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.showPopUp}
                            contentLabel="Quotes PopUp"
                            style={{ position: "absolute", top: "50vw", left: "50%", overlay: { zIndex: 1000, top: "25vh", bottom: "25vh", right: "25vw", left: "25vw" } }}>
                            <div className="popUp" >
                                <NumQuote press={this.addQuote} />
                            </div>
                        </Modal>
                    </div>
                )
            }
            else {
                return (<div><Form discount={this.state.discount} flashings={summary} panels={totalPanels} /></div>)
            }
        }
        else {
            if (this.state.send == false) {
                return (
                    <div className="AppMobile">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {logo1}
                            {logo2}
                        </div>
                        <Language press={this.changeLanguage} language={this.state.language} />
                        {logo3}
                        <div className="outerDivMobile">
                            {title}
                            <Discount discount={this.discountChange} />
                        </div>
                        <div className="WorkSpace">
                            <div className="outerDivMobile">
                                <div style={{ marginTop: "30px", display: "flex", flexDirection: "row" }}>
                                    <Orientation press={this.changeOrientation} landscape={this.state.landscape} />
                                    <div className="DropDown">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <PanelDropDown ids={this.state.Ids[3]} press={this.panelChange} panels={this.state.panels} />
                                            <PackerDropDown press={this.packerChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="TableUnder" style={{ width: "100%" }}>
                                    <div className="TableHeader" style={{ width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <KWP kwp={kwp} />
                                            <PricePerWatt currency={currency} panels={ppwPanels} total={ppwTotal} />
                                            <ArraySize size={this.arraySize()} landscape={this.state.landscape} />
                                        </div>
                                    </div>
                                    {grid}
                                </div>
                                <p></p>
                                <div className="horizontal">
                                    {bottomArrows}
                                </div>
                                <div className="horizontal">
                                    <AddQuote press={this.quotePopUp} />
                                    <Clear press={this.clearPress} />
                                </div>
                                <Window press={this.windowPress} landscape={this.state.landscape} />
                            </div>
                        </div>
                        <div className="outerDivMobile" style={{ marginTop: "20px", marginBottom: "20px",display:"inline-block" }}>
                            <KitSection flashings={this.state.flashings} ids={this.state.Ids} packers={this.state.packers} />
                        </div>
                        <div className="WorkSpace">
                            <div className="outerDivMobile" style={{ marginTop: "20px", marginBottom: "10px" }}>
                                {quotes}
                            </div>
                        </div>
                        <div className="WorkSpace2">
                            <div className="outerDivMobile" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <div id="divToPrint">{pdf}
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.showPopUp}
                            contentLabel="Quotes PopUp"
                            style={{ position: "absolute", top: "50vw", left: "50%", overlay: { zIndex: 1000, top: "25vh", bottom: "25vh", right: "25vw", left: "25vw" } }}>
                            <div className="popUp" >
                                <NumQuote press={this.addQuote} />
                            </div>
                        </Modal>
                    </div>
                )
            }
            else {
                return (<div><Form discount={this.state.discount} flashings={summary} panels={totalPanels} /></div>)
            }
        }
        
    }
}

export default App;
