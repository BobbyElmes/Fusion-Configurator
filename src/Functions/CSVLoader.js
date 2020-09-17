//formats money into £xx,xxx.xx format
//loads the csv file then parses it into an array of values
//file is the filepath, numItems is the number of tables we are parsing
//columnNum is the number of columns in the table 
//(must be the same for each table, only allowed to be different at the end)
function CSVLoader(file, numItems, columnNum) {
    var x = [[[]]]
    for (var i = 0; i < numItems - 1; i++)
        x.push([])
    var csv = readTextFile(file)
    var count = 0
    var columnCount = 0
    var itemCount = 0
    var product = x
    var first = true
    var s = ""
    var doubleQuotes = false
    var prev = csv[0]
    for (var i = 0; i < csv.length; i++) {
        var current = csv[i]
        if (first == true) {
            if (current.charCodeAt(0) == 10)
                first = false;
        }
        else {
            if (current == '"')
                doubleQuotes = !doubleQuotes
            else {
                if (doubleQuotes == true) {
                    var x = current
                    s += x
                }
                else {
                    if (current == ',' && prev != ',') {
                        product[itemCount][columnCount][count] = s
                        s = ""
                        count += 1
                        if (count >= columnNum && itemCount < numItems - 1) {
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
                            if (i != csv.length - 1)
                                product[itemCount].push(new Array(["", "", ""]))
                        }
                        else {
                            if (current != ',' && current.charCodeAt(0) != 13) {
                                var x = current
                                s += x
                            }
                        }
                    }
                }
            }
        }
        prev = current
    }
    return product
}

//function physically reads the csv into a string
function readTextFile(file) {
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
export default CSVLoader;