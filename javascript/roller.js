var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// rolls the dice and adds up the total
function roll(str) {
    var tokens = str.split(" ");
    var tot = 0;
    for (var i = 0; i < tokens.length; i++) {
        var _tokens$i$replace$spl = tokens[i].replace("+", "").split("d"),
            _tokens$i$replace$spl2 = _slicedToArray(_tokens$i$replace$spl, 2),
            num = _tokens$i$replace$spl2[0],
            type = _tokens$i$replace$spl2[1];

        var xVantage = 0;

        // advantage/disadvantage
        if (isNaN(num)) {
            if (num.includes("DIS")) {
                xVantage = -1;
            } else if (num.includes("ADV")) {
                xVantage = 1;
            }
            num = num.substring(3);
        }

        num = parseInt(num);
        type = parseInt(type);

        for (var j = 0; j < num; j++) {
            if (!xVantage) {
                tot += Math.floor(Math.random() * type);
            } else if (xVantage === 1) {
                tot += Math.max(Math.floor(Math.random() * type), Math.floor(Math.random() * type));
            } else {
                tot += Math.min(Math.floor(Math.random() * type), Math.floor(Math.random() * type));
            }
        }
    }

    return tot;
}