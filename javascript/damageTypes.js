// 0 = no type
// -x = magical x
// -10x = stage one resistance penetration (immune->resist, resist->none)
var dmgNEUTRAL = 0;
var dmgBLUDGEONING = 1;
var dmgSLASHING = 2;
var dmgPIERCING = 3;
var dmgCOLD = 4;
var dmgFIRE = 5;
var dmgACID = 6;
var dmgFORCE = 7;
var dmgLIGHTNING = 8;
var dmgNECROTIC = 9;
var dmgPOISON = 10;
var dmgPSYCHIC = 11;
var dmgRADIANT = 12;
var dmgTHUNDER = 13;

function deconstructType(type) {
    // type, magical, penetration
    return [Math.abs(type) % 100, type >= -100 && type < 0, type < -100 ? Math.floor(-1 * type / 100) : 0];
}