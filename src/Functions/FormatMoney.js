//formats money into £xx,xxx.xx format
function formatMoney(formattedTotal, eur) {
    var numDP = 0
    var foundDot = false
    if (eur == 5)
        formattedTotal = Math.round(parseFloat(formattedTotal)).toString()
    for (var i = formattedTotal.length - 1; i >= 0; i--) {
        if (formattedTotal[i] == '.') {
            foundDot = true
            break;
        }
        numDP++;
    }
    if (numDP > 2) {

    }

    if (numDP == 0 || foundDot == false)
        formattedTotal += ".00"
    else {
        if (numDP == 1)
            formattedTotal += "0"
    }
    var commaTotal = ""
    var start = (formattedTotal.length - 3) % 3
    var count = 0
    for (var i = 0; i < formattedTotal.length; i++) {
        count++;
        
        commaTotal += formattedTotal[i]

        if (i < formattedTotal.length - 4) {
            if (start != 0) {
                if (count == start) {
                    start = 0
                    count = 0
                    commaTotal += ","
                }
            }
            else {
                if (count == 3) {
                    count = 0
                    commaTotal += ","
                }
            }
        }

    }

    //convert to "£xx.xxx.xxx,xx format for Europeans
    if (eur > 0 && eur < 3) {
        var temp = commaTotal
        commaTotal = ""
        for (var i = 0; i < temp.length; i++) {
            if (temp[i] == ",")
                commaTotal += "."
            else {
                if (temp[i] == ".")
                    commaTotal += ","
                else
                    commaTotal += temp[i]
            }

        }
    }
    else {
        if (eur == 5) {
            var commaTotal = commaTotal.slice(0, -3);
        }
    }

    return commaTotal
}
export default formatMoney;
