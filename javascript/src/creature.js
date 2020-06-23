class Creature extends Class{
    // resistances: 0-none, 1-resist, 2-immune, -1-vulnerable, 10x-magical x
    constructor(avatar, name, stats, skills, hp, ac, spd, resistances = [], attributes = [], passives = [], actions = [], bonusActions = [], reactions = [], resources = null){
        super();

        if(avatar) {
            this.avatar = avatar;
        }
        else{
            this.avatar = defaultAvatar;
        }

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
        if(resources) {
            this.resources = getDefaultResources().concat(resources);
        }
        else{
            this.resources = getDefaultResources();
        }
    }
    // damages, takes into account resistances and whatnot
    damageMe(amount, type){
        let [dType, magical, pen] = deconstructType(type);
        let resist = this.resistances[dType] - pen;

        // not resistant
        if(!resist){
            this.currHP -= amount;
        }
        // this creature has resistance to magical types of this damage
        else if(resist > 100){
            if(resist % 100 === 1){
                this.currHP -= Math.floor(amount * 0.5);
            }
            else{
                // do nothing
            }
        }
        else if(resist === 1 && !magical){
            this.currHP -= Math.floor(amount * 0.5);
        }
        else if(resist === 2 && !magical){
            // nothing
        }
        else{
            this.currHP -= amount;
        }

        // die
        if(this.currHP <= 0){
            this.dropTo0();
        }
        this.rerender();
    }
    // heal
    healMe(amount){
        if(this.currHP <= 0){
            this.currHP = amount;
        }
        else{
            this.currHP += amount;
        }

        if(this.currHP > this.maxHP){
            this.currHP = this.maxHP;
        }
        this.rerender();
    }
    // drop to 0 hp TODO: death saves for players and overkill
    dropTo0(){
        this.currHP = 0;
        this.die();
    }
    // die
    die(){
        // TODO
    }
}

// REACT renderer - separate so that the object doesn't keep getting remade
class CreatureRenderer extends ReactComponent{
    render() {
        const resources = this.props.creature.resources.map((i) => <div>{ResourceRenderer.makeMe(i)}</div>);

        console.log(this.props.creature.resources);
        console.log(resources);

        return(
            <div className="creature">
                <img className="avatar" src={"images/" + this.props.creature.avatar} />
                <div>
                    <div className={"horz_flex"}>
                        <h1 className="creature_name">{this.props.creature.name}</h1>
                        <ImgText small={3} image={"info_circle.png"} text={""}>
                            <FloatComponent component={(<div/>)} maxWidth={100} maxHeight={100} />
                        </ImgText>
                    </div>
                    <Bar barColor={healthbarcolor} curr={this.props.creature.currHP} max={this.props.creature.maxHP} className="hp_bar" />
                </div>
                <div className={"vert_flex"}>
                    <ImgText small={true} image={"shield.png"} text={this.props.creature.ac} />
                    <ImgText small={true} image={"movement.png"} text={this.props.creature.speed} />
                </div>
                {resources}
            </div>
        );
    }

    static makeMe(creature) {
        return (
            <CreatureRenderer creature={creature}/>
        );
    }
}

// TODO: delete testing
let testCreature = new Creature(null, "Test Name", [10, 10, 10, 10, 10, 10], JSON.parse(JSON.stringify(normalSkills)), 100, 11, 30, getEmptyResistances());
ReactDOM.render(CreatureRenderer.makeMe(testCreature), $('#encounter_box')[0]);