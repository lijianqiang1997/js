var  newAutoClass = {
    regArr: [],
    solevFnArr: [],
    resultArr: [],
    addRules: function({reg,solveFn}) {
      this.regArr.push(reg?reg:null);
      this.solevFnArr.push(typeof solveFn === 'function'?solveFn:null);
    },
    run: function({
       unit='px',
       base= 1,
       log=true
    }={}) {
        var elements = document.body.getElementsByTagName("*"),
        elementArray = Array.prototype.slice.call(elements),
        style = "",
        totalArr= [],
        _this = this;
        var transformNum = function(num) {
           return num/base +unit;
        }
        elementArray.forEach(function(item,index,array) {
            var className = item.className;
            _this.regArr.forEach(function(reg,index) {
                if(reg===null) {
                    return;
                }
                if(!totalArr[index]) {
                    totalArr[index] = [];
                }
                var arr = className.match(reg);
                if(arr) {
                    totalArr[index] = totalArr[index].concat(arr);
                }
            })
        });
        totalArr.forEach(function(arr,index,array) {
            var solveFn = _this.solevFnArr[index];
            if(typeof solveFn !== 'function') {
                return;
            }
            arr = [...new Set(arr)];
            arr.forEach(function(item) {
                style += "." + item + "{"+solveFn(item,transformNum)+";}\n";
            });
        });
        if(log) {
            console.log(style)
        }
    }
};
document.addEventListener("DOMContentLoaded", function() {
    newAutoClass.addRules({
        reg: /(w|width)-\d+(\.\d+)/ig,
        solveFn: (className,transformNum)=>{
            item = className.trim();
            var width = item.split("-")[1];
            console.log(transformNum(width))
            return "width: " + transformNum(width);
        }
    });
    newAutoClass.run();
})