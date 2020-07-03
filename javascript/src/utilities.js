class ImgText extends React.Component{
    render() {
        return (
            <div className={"icon" + ((this.props.small) ? (" small" + (this.props.small + 0)) : ("")) + ((this.props.className) ? (" " + this.props.className) : (""))}>
                <img src={"images/" + this.props.image} />
                <p className={"text"}>
                    {this.props.text}
                </p>
                {this.props.children}
            </div>
        );
    }
}

// parent class that has the window's width/height and updates on resize
class WindowSizes extends React.Component{
    constructor(props){
        super(props);
        this.state = { windowWidth: 0, windowHeight: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }
}

// floating hide/unhide component
class Float extends WindowSizes{
    render() {
        const {windowWidth: windowWidth, windowHeight: windowHeight} = this.state;
        let {parentRef: parentRef, maxWidth: maxWidth, maxHeight: maxHeight} = this.props;

        maxWidth = maxWidth * windowWidth;
        maxHeight = maxHeight * windowHeight;

        const left = parentRef.current.getBoundingClientRect().left;
        const top = parentRef.current.getBoundingClientRect().top;
        const width = parentRef.current.getBoundingClientRect().width;
        const height = parentRef.current.getBoundingClientRect().height;

        let isOnLeft = false;

        let style = {
            position: "absolute",
            left: `${width + floatGap}px`,
            height: `${maxHeight}px`
        };

        // horz
        let myWidth = Math.min(maxWidth, windowWidth - left - width - (floatPadding * 2) - floatOffsetEdge - floatGap);
        style["width"] = myWidth + "px";
        if(myWidth < maxWidth/2){
            isOnLeft = true;
            style["left"] = `-${maxWidth + (floatPadding * 2) + floatGap}px`;
            style["width"] = `${maxWidth}px`
        }

        // vert
        let extraSpace = (windowHeight - top - floatOffsetEdge) - (maxHeight + (2 * floatPadding));
        style["top"] = `${Math.min(-(floatGap * 2), extraSpace)}px`;

        return(
            <div style={{display: "contents"}} >
                {((isOnLeft) ?
                    (<img className={"float_arrow left"} alt={"chat bubble"} src={"images/chat_left.png"} />) :
                    (<img className={"float_arrow right"} alt={"chat bubble"} src={"images/chat_right.png"} />))}
                <div className={"float"} style={style} ref={this.myRef}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
class FloatComponentHover extends React.Component{
    constructor(props){
        super(props);

        this.state = {show: false};
        this.myRef = React.createRef();
        this.handleEnter = this.handleEnter.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }
    render() {
        let {maxWidth: maxWidth, maxHeight: maxHeight} = this.props;
        if(!maxHeight){
            maxHeight = .4;
        }
        if(!maxWidth){
            maxWidth = .4;
        }

        let style = {
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%"
        };

        if(this.state.show){
            return(
                <div ref={this.myRef} style={style} onMouseEnter={this.handleEnter} onDragEnter={this.handleEnter} onMouseLeave={this.handleExit} onDragLeave={this.handleExit}>
                    <Float parentRef={this.myRef} maxWidth={maxWidth} maxHeight={maxHeight} >
                        {this.props.children}
                    </Float>
                </div>
            );
        }
        else{
            return(
                <div ref={this.myRef} style={style} onMouseEnter={this.handleEnter} onDragEnter={this.handleEnter} onMouseLeave={this.handleExit} onDragLeave={this.handleExit} />
            );
        }
    }

    handleEnter(e){
        // console.log(`Enter:`);
        this.setState((state) => ({show: true}));
    }
    handleExit(e){
        // console.log("Exit");
        this.setState((state) => ({show: false}));
    }
}
class FloatComponentClick extends React.Component{
    constructor(props){
        super(props);

        this.state = {show: false};
        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }
    render() {
        let {maxWidth: maxWidth, maxHeight: maxHeight} = this.props;
        if(!maxHeight){
            maxHeight = .4;
        }
        if(!maxWidth){
            maxWidth = .4;
        }

        let style = {
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
        };

        if(this.state.show){
            return(
                <div ref={this.myRef} style={style} onClick={this.handleClick} onMouseLeave={this.handleExit} onDragLeave={this.handleExit}>
                    <Float parentRef={this.myRef} maxWidth={maxWidth} maxHeight={maxHeight} >
                        {this.props.children}
                    </Float>
                </div>
            );
        }
        else{
            return(
                <div ref={this.myRef} style={style} onClick={this.handleClick} onMouseLeave={this.handleExit} onDragLeave={this.handleExit} />
            );
        }
    }

    handleClick(e){
        this.setState((state) => ({show: !state["show"]}));
    }
    handleExit(e){
        this.setState((state) => ({show: false}));
    }
}

class Bar extends React.Component{
    render() {
        let percent = (this.props.curr/this.props.max) * 100;

        let style = {
            backgroundColor: this.props.barColor,
            width: (Math.max(percent, 0).toString() + "%")
        };
        if(percent <= 0){
            style["opacity"] = "0";
        }

        return (
            <div className="bar_back centered_text_parent">
                <div className="bar_front"
                     style={style}>
                </div>
                <CenteredText text={`${this.props.curr}/${this.props.max}`} />
            </div>
        );
    }
}

// throw into any div to have text floating in its center, parent must be position: relative
class CenteredText extends React.Component{
    render() {
        if(this.props.color){
            return(
                <p className="centered_text" style={{color: this.props.color}}>
                    {this.props.text}
                </p>
            );
        }
        return(
            <p className="centered_text">
                {this.props.text}
            </p>
        );
    }
}