import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import Row from './components/Row.js'
import Button from 'react-bootstrap/Button';
import './components/Row.css';
import Expand from './components/Expand.js'
import FlashingTable from './components/Table.js'
import flashings from './components/FlashingList'
import Lflashings from './components/LandscapeFlashingList'
import PanelList from './components/PanelList'
import Window from './components/Window.js'
import Clear from './components/Clear.js'
import Orientation from './components/Orientation.js'
import DisplayQuote from './components/DisplayQuote.js'
import AddQuote from './components/AddQuote.js'
import SendQuote from './components/SendQuote.js'
import Form from './components/Form.js'
import PanelDropDown from './components/PanelDropDown.js'
import PDF from './components/PDF.js'
import Discount from './components/Discount.js'
import products from './Products/ProductsCSV.csv';
import languages from './Products/Languages.csv';
import queryString from 'query-string'
import PricePerWatt from './components/PricePerWatt.js'
import PackerDropDown from './components/Packers.js'
import ArraySize from './components/ArraySize'

class App extends React.Component {

    constructor(props) {
        super(props)
        //global variables
        this.state = {
            buttons: [],
            //type of each cell in grid (empty, solar, window)
            type: [[]],
            //value for flashing in grid
            flashing: [[]],
            marked: [[]],
            //list of flashings, count, price ect
            flashings: [[]],
            secondFlashings: [[]],
            packers: [[]],
            //array of cells which turn grey when mouse drag
            prevHover: [],
            xLen: 15,
            yLen: 9,
            window: false,
            downCell: [],
            down: false,
            landscape: false,
            send: false,
            Quotes: [],
            panels: [[]],
            currentPanel: 0,
            pdf: false,
            language: 0,
            discount: 0,
            packerWidth: 25
        }
        //get flashings from file
        this.getLanguage()
        this.getProducts()

        this.arraySize = this.arraySize.bind(this)
        this.pricePer = this.pricePer.bind(this)
        this.calculatePackers = this.calculatePackers.bind(this)
        this.packerChange = this.packerChange.bind(this)
        this.discountChange = this.discountChange.bind(this)
        this.getLanguage = this.getLanguage.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.loadCSV = this.loadCSV.bind(this)
        this.downloadPDF = this.downloadPDF.bind(this)
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
        for (var i = 0; i < this.state.yLen; i++) {
            this.state.type.push(new Array(this.state.xLen))
            this.state.flashing.push(new Array(this.state.xLen))
            this.state.marked.push(new Array(this.state.xLen))
            for (var c = 0; c < this.state.xLen; c++) {
                this.state.type[i][c] = 0
                this.state.flashing[i][c] = "none"
                this.state.marked[i][c] = false;
            }
            this.state.buttons.push(<Row key={i} xSize={this.state.xLen} type={this.state.type[i]} cellPress={this.cellPress} row={i} />)
        }
        
    }

    //checks the link query then assigns the correct language
    getLanguage() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let lang = params.get('lang');
        if (lang != null) {
            switch (lang) {
                case "nl":
                    this.state.language = 1
                    break;
                case "de":
                    this.state.language = 2
                    break;
                case "no":
                    this.state.language = 3
                    break;
            }
                
                
        }
    }

    //loads in the csv files and puts them into the relevent arrays
    getProducts() {
        var product = this.loadCSV(products, 4, 2)
        var descriptions = this.loadCSV(languages, 3, 5)

        //this array has the portrait, landscape and finally packer flashing
        //values & descriptions loaded into it
        var productArr = [[],[],[]]

        for (var c = 0; c < 3; c++) {
            for (var i = 0; i < product[c].length; i++) {
                if (product[c][i][0].length == 0)
                    break;
                productArr[c].push(new Array(4))
                productArr[c][i][0] = product[c][i][0]
                productArr[c][i][1] = 0
                productArr[c][i][2] = parseFloat(product[c][i][1])
                productArr[c][i][3] = descriptions[c][i][this.state.language + 1]
            }
        }

        //now to load the panel values
        var panelArr = []
        for (var i = 0; i < product[3].length; i++) {
            if (product[3][i][0] == "")
                break;
            panelArr.push(new Array(4))
            panelArr[i][0] = product[3][i][0]
            panelArr[i][1] = 0
            panelArr[i][2] = parseFloat(product[3][i][1])
            panelArr[i][3] = parseFloat(product[3][i][2])
        }

        //finally, set the values
        this.state.flashings = productArr[0]
        this.state.secondFlashings = productArr[1]
        this.state.panels = panelArr
        this.state.packers = productArr[2]
    }

    //loads the csv file then parses it into an array of values
    //file is the filepath, numItems is the number of tables we are parsing
    //columnNum is the number of columns in the table 
    //(must be the same for each table, only allowed to be different at the end)
    loadCSV(file, numItems,columnNum) {
        var x = [[[]]]
        for (var i = 0; i < numItems - 1; i++)
            x.push([])
        var csv = this.readTextFile(file)
        var count = 0
        var columnCount = 0
        var itemCount = 0
        var product = x
        var first = true
        var s = ""
        var prev = csv[0]
        for (var i = 0; i < csv.length; i++) {
            var current = csv[i]
            if (first == true) {
                if (current.charCodeAt(0) == 10)
                    first = false;
            }
            else {
                if (current == ',' && prev != ',') {
                    product[itemCount][columnCount][count] = s
                    s = ""
                    count += 1
                    if (count >= columnNum && itemCount < numItems-1) {
                        itemCount++
                        count = 0
                        product[itemCount].push(new Array(["", "", ""]))
                    }
                }
                else {
                    if (current.charCodeAt(0) == 10) {
                        product[itemCount][columnCount][count] = s
                        s = ""
                        itemCount = 0
                        count = 0
                        columnCount++
                        if (i != csv.length-1)
                            product[itemCount].push(new Array(["", "", ""]))
                    }
                    else {
                        if (current.charCodeAt(0) != 32 && current != ',' && current.charCodeAt(0) != 13) {
                            var x = current
                            s += x
                        }
                    }
                }
            }
            prev = current
        }

        return product

    }

    //function physically reads the csv into a string
    readTextFile (file) {
        var allText
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    allText = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);

        return allText
    };

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

    //changes the cell type when clicked
    //for example, from empty cell to a cell with a panel in
    cellPress(y,x) {
        var temp = this.state.type
        //if placing a velux window, otherwise
        if (this.state.window == true) {
            var window = this.checkVeluxValid(temp,x,y)
            if (window) {
                temp[x][y] = 2
                this.setState({
                    type: temp
                })
                this.flashingLogic(x, y)
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

        //unmark cells
        for (var i = 0; i < this.state.yLen; i++)
            for (var c = 0; c < this.state.xLen; c++) 
                this.state.marked[i][c] = false;

        //press cells
        for (var i = lowerx; i <= upperx; i++)
            for (var c = lowery; c <= uppery; c++)
                this.cellPress(i, c)
        this.state.down = false;
    }

    //clears/resets all the cells
    clearPress() {
        var flashVals = this.state.flashings
        var flashings = this.state.flashing
        var types = this.state.type

        for (var i = 0; i < this.state.yLen; i++)
            for (var c = 0; c < this.state.xLen; c++) {
                types[i][c] = 0
                flashings[i][c] = "none"
            }
        for (var i = 0; i < flashVals.length; i++) {
            flashVals[i][1] = 0
        }

        for (var i = 0; i < this.state.panels.length; i++)
            this.state.panels[i][1] = 0

        this.setState({
            flashings: flashVals,
            flashing: flashings,
            type: types
        })
        this.calculatePackers()
    }

    //allows the user to add a velux roof window to the array
    windowPress() {
        if (this.state.landscape == false)
            this.setState({
                window:!this.state.window
            })
    }

    //changes the orientation of the panels
    changeOrientation() {
        var temp = [];
        //create physical copy of one panel array as we'll be swapping them both
        //so don't want it to be by reference
        for (var i = 0; i < this.state.flashings.length; i++) {
            temp.push(new Array(4))
            for (var c = 0; c < 4; c++)
                temp[i][c] = this.state.flashings[i][c]
        }
        this.state.flashings = this.state.secondFlashings
        this.state.secondFlashings = temp
        this.setState({
            landscape: !this.state.landscape,
            window: false
        })
        //we want to clear the cells after this has been done
        this.clearPress()
    }

    //expands the grid when corresponding button is clicked
    //currently can expand up to 30 cells and resize down to 1x1 cells
    expandPress(expand) {
        var temp = this.state.type
        var xTemp = this.state.xLen
        var yTemp = this.state.yLen
        var flashing = this.state.flashing
        var marked = this.state.marked

        switch (expand) {
            case 0:
                //ensure grid isn't too big
                if (xTemp < 30) {
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
                    xTemp += 1
                }
                break;

            case 1:
                //recalculate cells bordering the column we are removing
                if (xTemp > 1) {
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
                }
                break;
            case 2:
                if (yTemp < 30) {
                    temp.push(new Array(xTemp))
                    flashing.push(new Array(xTemp))
                    marked.push(new Array(xTemp))
                    for (var i = 0; i < xTemp; i++) {
                        temp[yTemp][i] = 0
                        flashing[yTemp][i] = "none"
                        marked[yTemp][i] = false
                    }
                    yTemp += 1
                }
                break;
            case 3:
                //recalculate cells bordering the row we are removing
                if (yTemp > 1) {
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
            flashings : tempFlashing
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
                           temp[n + 1][g + 1] = (tempType[x+i + n][y +c+ g])
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
                                    flashItem = flashList[3][0]
                                else if (temp[1][2] != 0)
                                    flashItem = flashList[2][0]
                                else
                                    flashItem = flashList[1][0]

                            }
                            else {
                                //TY, TL
                                if (temp[1][2] != 0) {
                                    if (temp[2][1] != 0)
                                        flashItem = flashList[4][0]
                                    else
                                        flashItem = flashList[0][0]
                                }
                                else {
                                    if (temp[2][1] != 0)
                                        flashItem = flashList[4][0]
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
                                corners += flashList[8][0]
                            }
                            if (temp[0][0] != 0 && temp[0][1] != 0 && temp[1][0] != 0) {
                                if (corners.length > 0)
                                    corners += " "
                                corners += flashList[9][0]
                            }
                            if (temp[0][0] != 0 && temp[0][1] != 0 && temp[0][2] != 0 && temp[1][2] != 0) {
                                if (corners.length > 0)
                                    corners += " "
                                corners += flashList[10][0]
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
                        }
                        else {
                            tempFlash[x + i][y + c] = flashItem
                            this.changeFlash(1,flashItem)
                        }
                    }
                }
                    
            }
        }
        this.setState({
            flashing: tempFlash
        })
    }

    //this function is to resize the flashing grid so that
    //no unnecessary blank rows or columns are showing, when the user
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
    addQuote() {
        var total = 0
        var [mini, xSize] = this.resizeFlashingGrid()
        for(var c = 0; c < this.state.flashings.length; c++)
            total += this.state.flashings[c][1] * this.state.flashings[c][2]
        var temp = this.state.Quotes
        
        var flashTemp=this.state.flashings

        var flashCopy = []
        for (var i = 0; i < flashTemp.length; i++) {
            flashCopy.push(new Array(4))
            for (var c = 0; c < 4; c++)
                flashCopy[i][c] = flashTemp[i][c]
        }

        var tempPanels = []
        var panelTotal = 0
        for (var i = 0; i < 3; i++) {
            tempPanels.push(new Array(4))
            tempPanels[i][0] = this.state.panels[i][0]
            tempPanels[i][1] = this.state.panels[i][1]
            panelTotal += this.state.panels[i][1] * this.state.panels[i][3]
            tempPanels[i][2] = this.state.panels[i][2]
            tempPanels[i][3] = this.state.panels[i][3]
            this.state.panels[i][1] = 0;
        }

        var tempPackers = []
        let tempWidth = this.state.packerWidth
        for (var i = 0; i < this.state.packers.length; i++) {
            tempPackers.push(new Array(4))
            total += this.state.packers[i][1] * this.state.packers[i][2]
            tempPackers[i][0] = this.state.packers[i][0]
            tempPackers[i][1] = this.state.packers[i][1]
            tempPackers[i][2] = this.state.packers[i][2]
            tempPackers[i][3] = this.state.packers[i][3]
        }

        temp.push({
            key:temp.length,
            flashingList: flashCopy,
            landscape: this.state.landscape,
            total: total,
            miniFlashing: mini,
            xSize: xSize,
            panels: tempPanels,
            panelTotal: panelTotal,
            packers: tempPackers,
            width: tempWidth
        })

        
        
        this.setState({
            Quotes:temp
        })
        this.clearPress()
    }

    sendQuote() {
        this.setState({
            send: true
        });
    }

    createEmptyPanels(totalPanels) {
        var temp = this.state.panels
        for (var i = 0; i < temp.length; i++) {
            totalPanels.push(new Array(4))
            totalPanels[i][0] = temp[i][0]
            totalPanels[i][1] = 0
            totalPanels[i][2] = temp[i][2]
            totalPanels[i][3] = temp[i][3]
        }
    }

    //totals landscape and portrait flashings 
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

    removeQuote(index) {
        var temp = this.state.Quotes
        temp.splice(index, 1)
        this.setState({
            Quote: temp
        })
    }

    downloadPDF() {
        this.setState({
            pdf: !this.state.pdf
        })
    }

    discountChange(x) {
        console.log("D CHANGE: " + x)
        this.setState({
            discount:x
        })
    }

    packerChange(x) {
        this.state.packerWidth = x

        this.calculatePackers()
    }

    arraySize() {
        var resize = this.resizeFlashingGrid()
        var xLength = resize[1] * 1
        var yLength = resize[2] * 1
        if (isNaN(xLength)) {
            xLength = 0
            yLength = 0
        }
        return[xLength, yLength]
    }

    //calculations for the packers needed for the integration
    calculatePackers() {
        let width = this.state.packerWidth
        let landscape = this.state.landscape
        var packers = this.state.packers
        let flashing = this.state.flashings
        console.log("HI" + width)
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
                packers[1 + x][1] = flashing[2][1]
                packers[2 + x][1] = flashing[1][1]
                packers[3 + x][1] = flashing[4][1]
                packers[4 + x][1] = flashing[3][1]
                packers[5 + x][1] = flashing[5][1]
                packers[6 + x][1] = flashing[10][1]

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


    //renders the whole screen by sending relevent info down to sub components and placing them
    //in the right order
    render() {
        var x = []
        //create rows
        for (var i = 0; i < this.state.yLen; i++)
            x.push(<div style={{ marginTop: 0, marginBottom: 0, fontSize: 0 }}><Row key={i} xSize={this.state.xLen} type={this.state.type[i]} flashing={this.state.flashing[i]} cellPress={this.cellPress} row={i} down={this.cellDown} up={this.cellUp} landscape={this.state.landscape} cellOver={this.cellOver} marked={this.state.marked[i]} /></div>)

        var sum
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
                quotes.push(<DisplayQuote id={i + 1} remove={this.removeQuote} discount={this.state.discount} total={this.state.Quotes[i].total} flashings={this.state.Quotes[i].flashingList} landscape={this.state.Quotes[i].landscape} miniFlashing={this.state.Quotes[i].miniFlashing} xSize={this.state.Quotes[i].xSize} panels={this.state.Quotes[i].panels} panelTotal={this.state.Quotes[i].panelTotal} packers={this.state.Quotes[i].packers} width={this.state.Quotes[i].width}/>)
                summary = this.totalQuotes(summary, this.state.Quotes[i], half)
                overallTotal += this.state.Quotes[i].total
                overallTotal += this.state.Quotes[i].panelTotal
                for (var c = 0; c < this.state.Quotes[i].panels.length; c++) {
                    totalPanels[c][1] += this.state.Quotes[i].panels[c][1]
                    
                }
            }
            sum = <DisplayQuote id={0} total={overallTotal} discount={this.state.discount} flashings={summary} landscape={true} panels={totalPanels} />
            pdf = <PDF total={overallTotal} flashings={summary} discount={this.state.discount} panels={totalPanels} Quotes={this.state.Quotes} />
        }
        
        var priceP = this.pricePer(overallTotal, totalPanels)
        var ppwTotal = priceP[0]
        var ppwPanels = priceP[1]

        
        
        
        //if not displaying the send form, display the configurator
        if (this.state.send == false) {
            if (this.state.pdf == false) {
                return (
                    <div id="capture">
                        <div className="layout">
                            <div className="outerDivCenter">
                                <h1> Fusion Configurator </h1>
                                <PricePerWatt panels={ppwPanels} total={ppwTotal} />
                                <ArraySize size={this.arraySize()}/>
                                {x}
                                <p> </p>
                                <div className="horizontal">
                                    <Expand expand={0} press={this.expandPress} />
                                    <Expand expand={1} press={this.expandPress} />
                                    <Expand expand={2} press={this.expandPress} />
                                    <Expand expand={3} press={this.expandPress} />
                                    <Window press={this.windowPress} />
                                    <Clear press={this.clearPress} />
                                    <Orientation press={this.changeOrientation} landscape={this.state.landscape} />
                                    <PanelDropDown press={this.panelChange} />
                                    <Discount discount={this.discountChange} />
                                    <PackerDropDown press={this.packerChange} />
                                </div>
                            </div>
                            <FlashingTable components={this.state.flashings} panelComponents={this.state.panels} landscape={this.state.landscape} discount={this.state.discount} packers={this.state.packers} width={this.state.packerWidth} />
                            <AddQuote press={this.addQuote} />
                            <br></br>
                            {sum}
                            <br></br>
                            {quotes}
                            <br></br>
                            {send}
                            <br></br>
                            <Button onClick={this.downloadPDF}>PDF</Button>
                            <br></br>
                            <br></br>
                        </div>
                        
                    </div>
                )
            }
            else {
                return (<div id="capture">
                    <div className="layout">
                        <Button onClick={this.downloadPDF}>BACK</Button>
                        <br></br>
                        <br></br>
                        <div id="divToPrint">{pdf}</div>
                    </div>
                </div>)
            }
        }
        else {
            return (<div><Form  discount={this.state.discount} flashings={summary} panels={totalPanels} /></div>)
        }
        
    }
}

export default App;
