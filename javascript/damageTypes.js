var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// 0 = no type
// -x = magical x
// -10x = stage one resistance penetration (immune->resist, resist->none)
var dmgTypes = new Map();
dmgTypes["neutral"] = 0;
dmgTypes["bludgeoning"] = 1;
dmgTypes["slashing"] = 2;
dmgTypes["piercing"] = 3;
dmgTypes["cold"] = 4;
dmgTypes["fire"] = 5;
dmgTypes["acid"] = 6;
dmgTypes["force"] = 7;
dmgTypes["lightning"] = 8;
dmgTypes["necrotic"] = 9;
dmgTypes["poison"] = 10;
dmgTypes["psychic"] = 11;
dmgTypes["radiant"] = 12;
dmgTypes["thunder"] = 13;

// reverse map to get names from number
var dmgTypesReverse = new Map();
for (var _ref in dmgTypes) {
    var _ref2 = _slicedToArray(_ref, 2);

    var key = _ref2[0];
    var value = _ref2[1];

    dmgTypesReverse[value] = key;
}

function getEmptyResistances() {
    return Array(dmgTypes.size).fill(0);
}

function deconstructType(type) {
    // type, magical, penetration
    return [Math.abs(type) % 100, type >= -100 && type < 0, type < -100 ? Math.floor(-1 * type / 100) : 0];
}