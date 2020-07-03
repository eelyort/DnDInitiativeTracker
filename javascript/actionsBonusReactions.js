var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// a single damage/condition inflicting instance
var AttackInstance = function () {
    function AttackInstance(isToHit, toHitToSave, successDamage, failDamage, successConditions, failConditions, damageType, saveStat) {
        _classCallCheck(this, AttackInstance);

        this.isToHit = isToHit;
        this.toHitToSave = toHitToSave;
        this.successDamage = successDamage;
        this.failDamage = failDamage;
        this.successConditions = successConditions;
        this.failConditions = failConditions;
        this.damageType = damageType;
        this.saveStat = saveStat;
    }

    _createClass(AttackInstance, [{
        key: "resolve",
        value: function resolve(ac, stats, proficiencyBonus, a) {}
    }]);

    return AttackInstance;
}();
// a chained attack, such as "hit" then save or take extra poison damage or condition, etc...


var ChainedAttackInstances = function ChainedAttackInstances(attacks) {
    _classCallCheck(this, ChainedAttackInstances);
};