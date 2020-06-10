class Creature{
    // resistances: 0-none, 1-resist, 2-immune, -1-vulnerable, 10x-magical x
    constructor(name, stats, skills, hp, ac, spd, resistances, attributes = [], passives = [], actions = [], bonusActions = [], reactions = [], resources = null){
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
    }
    // drop to 0 hp TODO: death saves for players and overkill
    dropTo0(){
        this.die();
    }
    // die
    die(){
        // TODO
    }
}