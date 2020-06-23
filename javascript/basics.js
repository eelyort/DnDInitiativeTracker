var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// bad practice, but this was the easiest way to get attacks to pass themselves back up the component tree
var Class = function () {
    function Class() {
        _classCallCheck(this, Class);

        this.rerender = function () {
            return console.log("uninit rerender");
        };
    }

    _createClass(Class, [{
        key: "updateWithRenderer",
        value: function updateWithRenderer(rend) {
            this.rerender = rend;
        }
    }]);

    return Class;
}();

var ReactComponent = function (_React$Component) {
    _inherits(ReactComponent, _React$Component);

    function ReactComponent(props) {
        _classCallCheck(this, ReactComponent);

        var _this = _possibleConstructorReturn(this, (ReactComponent.__proto__ || Object.getPrototypeOf(ReactComponent)).call(this, props));

        _this.state = { redraw: false };
        return _this;
    }

    _createClass(ReactComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            for (var i in this.props) {
                if (this.props[i] && this.props[i].updateWithRenderer) {
                    this.props[i].updateWithRenderer(function () {
                        return _this2.setState(function (state) {
                            return { redraw: !state.redraw };
                        });
                    });
                }
            }
        }
    }]);

    return ReactComponent;
}(React.Component);