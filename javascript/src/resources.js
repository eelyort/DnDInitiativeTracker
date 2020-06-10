class Resource{
    constructor(name, max, icon = null){
        this.name = name;
        this.maxVal = max;
        this.currVal = this.maxVal;

        this.icon = icon;
    }
    // returns true or false
    use(amount){
        if(this.currVal >= amount){
            this.currVal -= amount;
            return true;
        }
        return false;
    }
    recharge(amount){
        this.currVal += amount;
        if(this.currVal > this.maxVal){
            this.currVal = this.maxVal;
        }
    }
    turnStart(){
        // nothing
    }
}

// Resource which fully recharges every turn
class FullRechargeResource extends Resource{
    constructor(name, max, icon = null){
        super(name, max, icon);
    }
    turnStart() {
        this.recharge(this.maxVal);
    }
}

class Action extends FullRechargeResource{
    constructor(){
        super("Action", 1, "action.png");
    }
}

class BonusAction extends FullRechargeResource{
    constructor(){
        super("Bonus Action", 1, "bonus_action.png");
    }
}

class Reaction extends FullRechargeResource{
    constructor(){
        super("Reaction", 1, "reaction.png");
    }
}

class LegendaryActions extends FullRechargeResource{
    constructor(){
        super("Legendary Actions", 3);
    }
}

// REACT renderer - separate so that the object doesn't keep getting remade
class ResourceRenderer extends React.Component{
    render() {
        return (
          <div className="resource_icon">
            <img src={"images/" + this.props.resource.icon} />
          </div>
        );
    }
}

// TODO delete testing
ReactDOM.render(<ResourceRenderer resource={new Action()} />, $("#encounter_box")[0]);
ReactDOM.render(<ResourceRenderer resource={new BonusAction()} />, $("#encounter_box")[0]);