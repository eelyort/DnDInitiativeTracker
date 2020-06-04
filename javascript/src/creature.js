class Creature{
    // resistances: 0-none, 1-resist, 2-immune, -1-vulnerable
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
}