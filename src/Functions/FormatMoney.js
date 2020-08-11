//formats money into £xx,xxx.xx format
function formatMoney(formattedTotal, no) {
    var numDP = 0
    var foundDot = false
    for (var i = formattedTotal.length - 1; i >= 0; i--) {
        if (formattedTotal[i] == '.') {
            foundDot = true
            break;
        }
        numDP++;
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

    return commaTotal
}
export default formatMoney;
