var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Creature = function (_Class) {
    _inherits(Creature, _Class);

    // resistances: 0-none, 1-resist, 2-immune, -1-vulnerable, 10x-magical x
    function Creature(avatar, name, stats, skills, hp, ac, spd) {
        var resistances = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
        var attributes = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
        var passives = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [];
        var actions = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [];
        var bonusActions = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [];
        var reactions = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : [];
        var resources = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : null;

        _classCallCheck(this, Creature);

        var _this = _possibleConstructorReturn(this, (Creature.__proto__ || Object.getPrototypeOf(Creature)).call(this));

        if (avatar) {
            _this.avatar = avatar;
        } else {
            _this.avatar = defaultAvatar;
        }

        _this.name = name;
        _this.stats = stats;
        _this.skills = skills;
        _this.maxHP = hp;
        _this.currHP = _this.maxHP;
        _this.ac = ac;
        _this.speed = spd;
        _this.resistances = resistances;

        // always active, non-combat abilities and lore
        _this.attributes = attributes;

        // conditional passive abilities with actual effects such as vampire regen
        _this.passives = passives;

        // conditions such as grappled, paralyzed etc TODO: same loop as above
        _this.conditions = [];

        // actions TODO: multiattack is one action
        _this.actions = actions;

        // bonus actions
        _this.bonusActions = bonusActions;

        // reactions
        _this.reactions = reactions;

        // resources: ki, legendary actions, legendary resistances
        if (resources) {
            _this.resources = getDefaultResources().concat(resources);
        } else {
            _this.resources = getDefaultResources();
        }
        return _this;
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
            this.rerender();
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
            this.rerender();
        }
        // drop to 0 hp TODO: death saves for players and overkill

    }, {
        key: "dropTo0",
        value: function dropTo0() {
            this.currHP = 0;
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
}(Class);

// REACT renderer - separate so that the object doesn't keep getting remade


var CreatureRenderer = function (_ReactComponent) {
    _inherits(CreatureRenderer, _ReactComponent);

    function CreatureRenderer() {
        _classCallCheck(this, CreatureRenderer);

        return _possibleConstructorReturn(this, (CreatureRenderer.__proto__ || Object.getPrototypeOf(CreatureRenderer)).apply(this, arguments));
    }

    _createClass(CreatureRenderer, [{
        key: "render",
        value: function render() {
            var resources = this.props.creature.resources.map(function (i) {
                return React.createElement(
                    "div",
                    null,
                    ResourceRenderer.makeMe(i)
                );
            });

            console.log(this.props.creature.resources);
            console.log(resources);

            return React.createElement(
                "div",
                { className: "creature" },
                React.createElement("img", { className: "avatar", src: "images/" + this.props.creature.avatar }),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "horz_flex" },
                        React.createElement(
                            "h1",
                            { className: "creature_name" },
                            this.props.creature.name
                        ),
                        React.createElement(
                            ImgText,
                            { small: 3, image: "info_circle.png", text: "" },
                            React.createElement(FloatComponent, { component: React.createElement("div", null), maxWidth: 100, maxHeight: 100 })
                        )
                    ),
                    React.createElement(Bar, { barColor: healthbarcolor, curr: this.props.creature.currHP, max: this.props.creature.maxHP, className: "hp_bar" })
                ),
                React.createElement(
                    "div",
                    { className: "vert_flex" },
                    React.createElement(ImgText, { small: true, image: "shield.png", text: this.props.creature.ac }),
                    React.createElement(ImgText, { small: true, image: "movement.png", text: this.props.creature.speed })
                ),
                resources
            );
        }
    }], [{
        key: "makeMe",
        value: function makeMe(creature) {
            return React.createElement(CreatureRenderer, { creature: creature });
        }
    }]);

    return CreatureRenderer;
}(ReactComponent);

// TODO: delete testing


var testCreature = new Creature(null, "Test Name", [10, 10, 10, 10, 10, 10], JSON.parse(JSON.stringify(normalSkills)), 100, 11, 30, getEmptyResistances());
ReactDOM.render(CreatureRenderer.makeMe(testCreature), $('#encounter_box')[0]);