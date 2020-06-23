class Resource extends Class{
    constructor(name, max, icon = null){
        super();

        this.name = name;
        this.maxVal = max;
        this.currVal = this.maxVal;

        this.icon = icon;
    }
    // returns true or false
    use(amount){
        if(this.currVal >= amount){
            this.currVal -= amount;
            this.rerender();
            return true;
        }
        return false;
    }
    recharge(amount){
        this.currVal += amount;
        if(this.currVal > this.maxVal){
            this.currVal = this.maxVal;
        }
        this.rerender();
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

class ActionResource extends FullRechargeResource{
    constructor(){
        super("Action", 1, "action.png");
    }
}

class BonusActionResource extends FullRechargeResource{
    constructor(){
        super("Bonus Action", 1, "bonus_action.png");
    }
}

class ReactionResource extends FullRechargeResource{
    constructor(){
        super("Reaction", 1, "reaction.png");
    }
}

class LegendaryActionsResource extends FullRechargeResource{
    constructor(){
        super("Legendary Actions", 3);
    }
}

function getDefaultResources(){
    return [new ActionResource(), new BonusActionResource(), new ReactionResource()];
}

// REACT renderer - separate so that the object doesn't keep getting remade
class ResourceRenderer extends ReactComponent{
    render() {
        return (
          <div className="resource_icon icon">
            <img src={"images/" + this.props.resource.icon} />
          </div>
        );
    }
    static makeMe(resource){
        return(
            <ResourceRenderer resource={resource} />
        );
    }
}

// TODO delete testing
// ReactDOM.render(ResourceRenderer.makeMe(new ActionResource()), $("#encounter_box")[0]);