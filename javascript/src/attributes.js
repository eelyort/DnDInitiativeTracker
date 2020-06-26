class Attribute{
    constructor(name = "NONE", desc = "NONE"){
        this.name = name;
        this.description = desc;
    }
}

function GETSAMPLEATTRIBUTES(){
    return(
      [
          new Attribute("Swim Speed", "30ft"),
          new Attribute("Sunlight Sensitivity", "While in sunlight, this creature has disadvantage on Attack rolls, as well as on Wisdom (Perception) checks that rely on sight."),
          new Attribute("Pack Tactics", "This creature has advantage on an Attack roll against a creature if at least one of the kobold's allies is within 5 ft. of the creature and the ally isn't Incapacitated.")
      ]
    );
}