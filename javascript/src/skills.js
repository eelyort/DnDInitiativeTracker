// the skills
class Skill{
    // proficient: 0-not, 1-proficient, 2-expertise
    constructor(name, stat, proficient = 0, overrideBonus = 0){
        this.name = name;
        this.stat = stat;
        this.proficient = proficient;
        this.overrideBonus = overrideBonus;
    }
    rollSkill(stats, proficiency, xVantage, bonus = 0){
        return roll(`${((!xVantage) ? ("") : (((xVantage === 1) ? ("ADV") : ("DIS"))))}d20`)
            + ((this.overrideBonus) ? (this.overrideBonus)
                : (stats[this.stat] + this.proficient * proficiency))
            + bonus;
    }
    static skillsFromProficiency(proficiency){
        let ans = JSON.parse(JSON.stringify(normalSkills));
        for (let i = 0; i < ans.length; i++) {
            ans[i].proficient = proficiency[i];
        }
        return ans;
    }
}

// stats: 0:str, 1:dex, 2:con, 3:int, 4:wis, 5:cha
const normalSkills = [
    new Skill("Acrobatics", 1),
    new Skill("Animal Handling", 4),
    new Skill("Arcana", 3),
    new Skill("Athletics", 0),
    new Skill("Deception", 5),
    new Skill("History", 3),
    new Skill("Insight", 4),
    new Skill("Intimidation", 5),
    new Skill("Investigation", 3),
    new Skill("Medicine", 4),
    new Skill("Nature", 3),
    new Skill("Perception", 4),
    new Skill("Performance", 5),
    new Skill("Persuasion", 5),
    new Skill("Religion", 3),
    new Skill("Sleight of Hand", 1),
    new Skill("Stealth", 1),
    new Skill("Survival", 4)
];