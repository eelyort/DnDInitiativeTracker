// 0 = no type
// -x = magical x
// -10x = stage one resistance penetration (immune->resist, resist->none)
const dmgNEUTRAL = 0;
const dmgBLUDGEONING = 1;
const dmgSLASHING = 2;
const dmgPIERCING = 3;
const dmgCOLD = 4;
const dmgFIRE = 5;
const dmgACID = 6;
const dmgFORCE = 7;
const dmgLIGHTNING = 8;
const dmgNECROTIC = 9;
const dmgPOISON = 10;
const dmgPSYCHIC = 11;
const dmgRADIANT = 12;
const dmgTHUNDER = 13;

function deconstructType(type) {
    // type, magical, penetration
    return [Math.abs(type) % 100, type >= -100 && type < 0, ((type < -100) ? (Math.floor((-1 * type) / 100)) : (0))];
}