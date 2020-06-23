// 0 = no type
// -x = magical x
// -10x = stage one resistance penetration (immune->resist, resist->none)
const dmgTypes = new Map();
dmgTypes["neutral"] = 0;
dmgTypes["bludgeoning"] = 1;
dmgTypes["slashing"] = 2;
dmgTypes["piercing"] = 3;
dmgTypes["cold"] = 4;
dmgTypes["fire"] = 5;
dmgTypes["acid"] = 6;
dmgTypes["force"] = 7;
dmgTypes["lightning"] = 8;
dmgTypes["necrotic"] = 9;
dmgTypes["poison"] = 10;
dmgTypes["psychic"] = 11;
dmgTypes["radiant"] = 12;
dmgTypes["thunder"] = 13;

// reverse map to get names from number
const dmgTypesReverse = new Map();
for(let [key, value] in dmgTypes){
    dmgTypesReverse[value] = key;
}

function getEmptyResistances() {
    return Array(dmgTypes.size).fill(0);
}

function deconstructType(type) {
    // type, magical, penetration
    return [Math.abs(type) % 100, type >= -100 && type < 0, ((type < -100) ? (Math.floor((-1 * type) / 100)) : (0))];
}