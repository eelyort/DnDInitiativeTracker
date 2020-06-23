var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = function (_Class) {
    _inherits(Resource, _Class);

    function Resource(name, max) {
        var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, Resource);

        var _this = _possibleConstructorReturn(this, (Resource.__proto__ || Object.getPrototypeOf(Resource)).call(this));

        _this.name = name;
        _this.maxVal = max;
        _this.currVal = _this.maxVal;

        _this.icon = icon;
        return _this;
    }
    // returns true or false


    _createClass(Resource, [{
        key: "use",
        value: function use(amount) {
            if (this.currVal >= amount) {
                this.currVal -= amount;
                this.rerender();
                return true;
            }
            return false;
        }
    }, {
        key: "recharge",
        value: function recharge(amount) {
            this.currVal += amount;
            if (this.currVal > this.maxVal) {
                this.currVal = this.maxVal;
            }
            this.rerender();
        }
    }, {
        key: "turnStart",
        value: function turnStart() {
            // nothing
        }
    }]);

    return Resource;
}(Class);

// Resource which fully recharges every turn


var FullRechargeResource = function (_Resource) {
    _inherits(FullRechargeResource, _Resource);

    function FullRechargeResource(name, max) {
        var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        _classCallCheck(this, FullRechargeResource);

        return _possibleConstructorReturn(this, (FullRechargeResource.__proto__ || Object.getPrototypeOf(FullRechargeResource)).call(this, name, max, icon));
    }

    _createClass(FullRechargeResource, [{
        key: "turnStart",
        value: function turnStart() {
            this.recharge(this.maxVal);
        }
    }]);

    return FullRechargeResource;
}(Resource);

var ActionResource = function (_FullRechargeResource) {
    _inherits(ActionResource, _FullRechargeResource);

    function ActionResource() {
        _classCallCheck(this, ActionResource);

        return _possibleConstructorReturn(this, (ActionResource.__proto__ || Object.getPrototypeOf(ActionResource)).call(this, "Action", 1, "action.png"));
    }

    return ActionResource;
}(FullRechargeResource);

var BonusActionResource = function (_FullRechargeResource2) {
    _inherits(BonusActionResource, _FullRechargeResource2);

    function BonusActionResource() {
        _classCallCheck(this, BonusActionResource);

        return _possibleConstructorReturn(this, (BonusActionResource.__proto__ || Object.getPrototypeOf(BonusActionResource)).call(this, "Bonus Action", 1, "bonus_action.png"));
    }

    return BonusActionResource;
}(FullRechargeResource);

var ReactionResource = function (_FullRechargeResource3) {
    _inherits(ReactionResource, _FullRechargeResource3);

    function ReactionResource() {
        _classCallCheck(this, ReactionResource);

        return _possibleConstructorReturn(this, (ReactionResource.__proto__ || Object.getPrototypeOf(ReactionResource)).call(this, "Reaction", 1, "reaction.png"));
    }

    return ReactionResource;
}(FullRechargeResource);

var LegendaryActionsResource = function (_FullRechargeResource4) {
    _inherits(LegendaryActionsResource, _FullRechargeResource4);

    function LegendaryActionsResource() {
        _classCallCheck(this, LegendaryActionsResource);

        return _possibleConstructorReturn(this, (LegendaryActionsResource.__proto__ || Object.getPrototypeOf(LegendaryActionsResource)).call(this, "Legendary Actions", 3));
    }

    return LegendaryActionsResource;
}(FullRechargeResource);

function getDefaultResources() {
    return [new ActionResource(), new BonusActionResource(), new ReactionResource()];
}

// REACT renderer - separate so that the object doesn't keep getting remade

var ResourceRenderer = function (_ReactComponent) {
    _inherits(ResourceRenderer, _ReactComponent);

    function ResourceRenderer() {
        _classCallCheck(this, ResourceRenderer);

        return _possibleConstructorReturn(this, (ResourceRenderer.__proto__ || Object.getPrototypeOf(ResourceRenderer)).apply(this, arguments));
    }

    _createClass(ResourceRenderer, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "resource_icon icon" },
                React.createElement("img", { src: "images/" + this.props.resource.icon })
            );
        }
    }], [{
        key: "makeMe",
        value: function makeMe(resource) {
            return React.createElement(ResourceRenderer, { resource: resource });
        }
    }]);

    return ResourceRenderer;
}(ReactComponent);

// TODO delete testing
// ReactDOM.render(ResourceRenderer.makeMe(new ActionResource()), $("#encounter_box")[0]);