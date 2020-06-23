let a = {"int": 1, "string": "hello", "double": 25.2};
a["sup"] = 54;

const {int: int, double: c, sup: sup, string: e} = a;

console.log(`int: ${int}, double: ${c}, sup: ${sup}, string: ${e}`);