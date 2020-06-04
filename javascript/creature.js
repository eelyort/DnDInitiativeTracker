function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Creature =
// resistances: 0-none, 1-resist, 2-immune, -1-vulnerable
function Creature(name, stats, skills, hp, ac, spd, resistances) {
        var attributes = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
        var passives = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
        var actions = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [];
        var bonusActions = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [];
        var reactions = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [];
        var resources = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : null;

        _classCallCheck(this, Creature);

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
};