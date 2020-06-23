// bad practice, but this was the easiest way to get attacks to pass themselves back up the component tree
class Class{
    constructor(){
        this.rerender = () => console.log("uninit rerender");
    }
    updateWithRenderer(rend){
        this.rerender = rend;
    }
}

class ReactComponent extends React.Component{
    constructor(props){
        super(props);

        this.state = {redraw: false};
    }
    componentDidMount() {
        for(let i in this.props){
            if(this.props[i] && this.props[i].updateWithRenderer){
                this.props[i].updateWithRenderer(() => this.setState((state) => ({redraw: !state.redraw})));
            }
        }
    }
}