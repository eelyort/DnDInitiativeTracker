var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// the skills
var Skill = function () {
    // proficient: 0-not, 1-proficient, 2-expertise
    function Skill(name, stat) {
        var proficient = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var overrideBonus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        _classCallCheck(this, Skill);

        this.name = name;
        this.stat = stat;
        this.proficient = proficient;
        this.overrideBonus = overrideBonus;
    }

    _createClass(Skill, [{
        key: "rollSkill",
        value: function rollSkill(stats, proficiency, xVantage) {
            var bonus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            return roll((!xVantage ? "" : xVantage === 1 ? "ADV" : "DIS") + "d20") + (this.overrideBonus ? this.overrideBonus : stats[this.stat] + this.proficient * proficiency) + bonus;
        }
    }], [{
        key: "skillsFromProficiency",
        value: function skillsFromProficiency(proficiency) {
            var ans = JSON.parse(JSON.stringify(normalSkills));
            for (var i = 0; i < ans.length; i++) {
                ans[i].proficient = proficiency[i];
            }
            return ans;
        }
    }]);

    return Skill;
}();

// stats: 0:str, 1:dex, 2:con, 3:int, 4:wis, 5:cha


var normalSkills = [new Skill("Acrobatics", 1), new Skill("Animal Handling", 4), new Skill("Arcana", 3), new Skill("Athletics", 0), new Skill("Deception", 5), new Skill("History", 3), new Skill("Insight", 4), new Skill("Intimidation", 5), new Skill("Investigation", 3), new Skill("Medicine", 4), new Skill("Nature", 3), new Skill("Perception", 4), new Skill("Performance", 5), new Skill("Persuasion", 5), new Skill("Religion", 3), new Skill("Sleight of Hand", 1), new Skill("Stealth", 1), new Skill("Survival", 4)];