window.onDOMContentLoaded = function() {
    var elements = document.getElementsByTagName("*"),
        elementArray = Array.prototype.slice.call(elements),
        marginArr = [],
        paddingArr = [],
        fontArr = [],
        style = "";
    elementArray.forEach(function(item, index, array) {
        var className = " " + item.className.replace(/\s/g, "  ") + " ",
            str = "(-(t|r|b|l|tb|rl)-\\d+){1,4}",
            marRegStr = "\\smar(-\\d+|" + str + ")\\s",
            padRegStr = "\\spad(-\\d+|" + str + ")\\s",
            marReg = new RegExp(marRegStr, "ig"),
            padReg = new RegExp(padRegStr, "ig"),
            fontReg = /font-\d+/,
            marArr = className.match(marReg),
            padArr = className.match(padReg),
            font = className.match(fontReg);
        if (marArr) {
            marginArr = marginArr.concat(marArr);
        }
        if (padArr) {
            paddingArr = paddingArr.concat(padArr);
        }
        if (font) {
            fontArr = fontArr.concat(font);
        }
    });
    marginArr = [...new Set(marginArr)];
    paddingArr = [...new Set(paddingArr)];
    fontArr = [...new Set(fontArr)];
    marginArr.forEach(function(item, index, array) {
        var str = "-(t|r|b|l|tb|rl)-\\d+",
            number,
            nArr = [],
            s = "",
            reg = new RegExp(str, "ig"),
            item = item.trim();
        if (/^mar-\d+$/.test(item)) {
            number = item.split("mar-")[1];
            style += "." + item + "{margin:" +
                number + "px;}\n";
        } else {
            s = "";
            nArr = item.split("mar-")[1];
            var a = nArr.split("-"),
                position,
                num,
                i = 0,
                length = a.length;
            for (; i < length; i += 2) {
                position = a[i].toLocaleLowerCase();
                num = a[i + 1];
                if (position === "t") {
                    s += "margin-top:" + num + "px;";
                } else if (position === "r") {
                    s += "margin-right:" + num + "px;";
                } else if (position === "b") {
                    s += "margin-bottom:" + num + "px;";
                } else if (position === "l") {
                    s += "margin-left:" + num + "px;";
                } else if (position === "lr" || position === "rl") {
                    s += "margin-left:" + num + "px;" + "margin-right:" + num + "px;";
                } else if (position === "tb" || position === "bt") {
                    s += "margin-top:" + num + "px;" + "margin-bottom:" + num + "px;";
                } else if (position === "tb" || position === "bt") {
                    s += "margin-top:" + num + "px;" + "margin-bottom:" + num + "px;";
                }
            }
            style += "." + item + "{" + s + "}\n";
        }
    });
    paddingArr.forEach(function(item, index, array) {
        var str = "-(t|r|b|l|tb|rl)-\\d+",
            number,
            nArr = [],
            s = "",
            reg = new RegExp(str, "ig"),
            item = item.trim();
        if (/^pad-\d+$/.test(item)) {
            number = item.split("pad-")[1];
            style += "." + item + "{padding:" +
                number + "px;}\n";
        } else {
            s = "";
            nArr = item.split("pad-")[1];
            var a = nArr.split("-"),
                position,
                num,
                i = 0,
                length = a.length;
            for (; i < length; i += 2) {
                position = a[i].toLocaleLowerCase();
                num = a[i + 1];
                if (position === "t") {
                    s += "padding-top:" + num + "px;";
                } else if (position === "r") {
                    s += "padding-right:" + num + "px;";
                } else if (position === "b") {
                    s += "padding-bottom:" + num + "px;";
                } else if (position === "l") {
                    s += "padding-left:" + num + "px;";
                } else if (position === "lr") {
                    s += "padding-left:" + num + "px;" + "padding-right:" + num + "px;";
                } else if (position === "tb") {
                    s += "padding-top:" + num + "px;" + "padding-bottom:" + num + "px;";
                }
            }
            style += "." + item + "{" + s + "}\n";
        }
    });

    fontArr.forEach(function(item, index, array) {
        item = item.trim();
        var fontSize = item.split("font-")[1];
        style += "." + item + "{font-size: " + fontSize + "px;}\n";
    });

    var styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
    console.log(style);
}