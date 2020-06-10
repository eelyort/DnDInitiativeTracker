var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Creature = function () {
    // resistances: 0-none, 1-resist, 2-immune, -1-vulnerable, 10x-magical x
    function Creature(name, stats, skills, hp, ac, spd, resistances) {
        var attributes = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
        var passives = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
        var actions = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [];
        var bonusActions = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [];
        var reactions = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [];
        var resources = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : null;

        _classCallCheck(this, Creature);

        this.name = name;
        this.stats = stats;
        this.skills = skills;
        this.maxHP = hp;
        this.currHP = this.maxHP;
        this.ac = ac;
        this.speed = spd;
        this.resistances = resistances;

        // always active, non-combat abilities and lore
        this.attributes = attributes;

        // conditional passive abilities with actual effects such as vampire regen
        this.passives = passives;

        // conditions such as grappled, paralyzed etc TODO: same loop as above
        this.conditions = [];

        // actions TODO: multiattack is one action
        this.actions = actions;

        // bonus actions
        this.bonusActions = bonusActions;

        // reactions
        this.reactions = reactions;

        // resources: ki, legendary actions, legendary resistances
        this.resources = resources;
    }
    // damages, takes into account resistances and whatnot


    _createClass(Creature, [{
        key: "damageMe",
        value: function damageMe(amount, type) {
            var _deconstructType = deconstructType(type),
                _deconstructType2 = _slicedToArray(_deconstructType, 3),
                dType = _deconstructType2[0],
                magical = _deconstructType2[1],
                pen = _deconstructType2[2];

            var resist = this.resistances[dType] - pen;

            // not resistant
            if (!resist) {
                this.currHP -= amount;
            }
            // this creature has resistance to magical types of this damage
            else if (resist > 100) {
                    if (resist % 100 === 1) {
                        this.currHP -= Math.floor(amount * 0.5);
                    } else {
                        // do nothing
                    }
                } else if (resist === 1 && !magical) {
                    this.currHP -= Math.floor(amount * 0.5);
                } else if (resist === 2 && !magical) {
                    // nothing
                } else {
                    this.currHP -= amount;
                }

            // die
            if (this.currHP <= 0) {
                this.dropTo0();
            }
        }
        // heal

    }, {
        key: "healMe",
        value: function healMe(amount) {
            if (this.currHP <= 0) {
                this.currHP = amount;
            } else {
                this.currHP += amount;
            }

            if (this.currHP > this.maxHP) {
                this.currHP = this.maxHP;
            }
        }
        // drop to 0 hp TODO: death saves for players and overkill

    }, {
        key: "dropTo0",
        value: function dropTo0() {
            this.die();
        }
        // die

    }, {
        key: "die",
        value: function die() {
            // TODO
        }
    }]);

    return Creature;
}();