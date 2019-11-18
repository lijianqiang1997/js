var newAutoClass = {
    regArr: [],
    solevFnArr: [],
    resultArr: [],
    addRules: function ({ reg, solveFn }) {
        var length = arguments.length,
            obj,
            reg,
            solveFn,
            objArr = Array.prototype.slice.call(arguments),
            _this = this;
        Array.prototype.slice.call(arguments).forEach(function (item, index, array) {
            obj = item;
            reg = obj.reg;
            solveFn = obj.solveFn;
            _this.regArr.push(reg ? reg : null);
            _this.solevFnArr.push(typeof solveFn === 'function' ? solveFn : null);
        })
    },
    run: function ({
        unit = 'px',
        base = 1,
        log = true
    } = {}) {
        var elements = document.body.getElementsByTagName("*"),
            elementArray = Array.prototype.slice.call(elements),
            style = "",
            totalArr = [],
            _this = this;
        var transformNum = function (num) {
            return num / base + unit;
        }
        elementArray.forEach(function (item, index, array) {
            var className = item.className;
            
            _this.regArr.forEach(function (reg, index) {
                if (reg === null) {
                    return;
                }
                if (!totalArr[index]) {
                    totalArr[index] = [];
                }
                var arr = className.match(reg);
                console.log(className,reg,arr)
                if (arr) {
                    totalArr[index] = totalArr[index].concat(arr);
                }
            })
        });
        
        // 不同分类css属性集合
        totalArr.forEach(function (arr, index, array) {
            var solveFn = _this.solevFnArr[index];
            if (typeof solveFn !== 'function') {
                return;
            }
            
            arr = [...new Set(arr)];
            arr.forEach(function (item) {
                style += "." + item + "{" + solveFn(item, transformNum) + ";}\n";
            });
        });
        if (log) {
            console.log(style)
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var str = "(-(t|r|b|l|tb|rl|bt|lr)-\\d+){1,4}",
        marRegStr = "\\smar(-\\d+|" + str + ")\\s",
        padRegStr = "\\spad(-\\d+|" + str + ")\\s",
        widthReg = /\b(w|width)-\d+(?:\.\d+)?/ig,
        heightReg = /\b(h|height)-\d+(?:\.\d+)?/ig,
        marReg = new RegExp(marRegStr, "ig"),
        padReg = new RegExp(padRegStr, "ig"),
        fontReg = /\sfont-\d+\s/ig,
        lineHeightReg = /\sline-height-\d+\s/ig,
        colorReg = /\scolor-([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\s/ig,
        directionReg = /\s(top|right|bottom|left|t|r|b|l)--?\d+\s/ig;
    var commonSolveFn = function (item, transformNum) {
        item = item.trim();
        var attrObj = {
            w: 'width',
            h: 'height'
        },
            resultArr = item.split("-"),
            attr = resultArr[0].toLocaleLowerCase(),
            num = resultArr[1];

        if (attr in attrObj) {
            attr = attrObj[attr]
        }

        if (typeof transformNum === 'function') {
            num = transformNum(num);
        }
        return attr + ": " + num;
    },
        marginSolveFn = function (item) {
            var str = "-(t|r|b|l|tb|rl)-\\d+",
                number,
                nArr = [],
                s = "",
                reg = new RegExp(str, "ig"),
                item = item.trim();
            if (/^mar-\d+$/.test(item)) {
                number = item.split(/mar-/i)[1];
                style += "." + item + "{margin:" +
                    number + "px;}\n";
            } else {
                s = "";
                nArr = item.split(/mar-/i)[1];
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
                    }
                }
                style += "." + item + "{" + s + "}\n";
            }
        },
        paddingSolveFn = function (item) {
            var str = "-(t|r|b|l|tb|rl)-\\d+",
                number,
                nArr = [],
                s = "",
                reg = new RegExp(str, "ig"),
                item = item.trim();
            if (/^pad-\d+$/.test(item)) {
                number = item.split(/pad-/i)[1];
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
                    } else if (position === "lr" || position === "rl") {
                        s += "padding-left:" + num + "px;" + "padding-right:" + num + "px;";
                    } else if (position === "tb" || position === "bt") {
                        s += "padding-top:" + num + "px;" + "padding-bottom:" + num + "px;";
                    }
                }
                style += "." + item + "{" + s + "}\n";
            }
        };

    newAutoClass.addRules({
        reg: widthReg,
        solveFn: commonSolveFn
    }, {
        reg: heightReg,
        solveFn: commonSolveFn
    }, {
        reg: marReg,
        solveFn: marginSolveFn
    }, {
        reg: padReg,
        solveFn: paddingSolveFn
    });
    newAutoClass.run({
        unit: 'rem',
        base: 750
    });
})