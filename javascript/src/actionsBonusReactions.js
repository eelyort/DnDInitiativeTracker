// a single damage/condition inflicting instance
class AttackInstance{
    constructor(isToHit, toHitToSave, successDamage, failDamage, successConditions, failConditions, damageType, saveStat){
        this.isToHit = isToHit;
        this.toHitToSave = toHitToSave;
        this.successDamage = successDamage;
        this.failDamage = failDamage;
        this.successConditions = successConditions;
        this.failConditions = failConditions;
        this.damageType = damageType;
        this.saveStat = saveStat;
    }
    resolve(ac, stats, proficiencyBonus, a){

    }
}
// a chained attack, such as "hit" then save or take extra poison damage or condition, etc...
class ChainedAttackInstances{
    constructor(attacks) {

    }
}