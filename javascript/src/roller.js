// rolls the dice and adds up the total
function roll(str){
    let tokens = str.split(" ");
    let tot = 0;
    for (let i = 0; i < tokens.length; i++) {
        let [num, type] = tokens[i].replace("+", "").split("d");
        let xVantage = 0;

        // advantage/disadvantage
        if(isNaN(num)){
            if(num.includes("DIS")){
                xVantage = -1;
            }
            else if(num.includes("ADV")){
                xVantage = 1;
            }
            num = num.substring(3);
        }

        num = parseInt(num);
        type = parseInt(type);

        for (let j = 0; j < num; j++) {
            if(!xVantage){
                tot += Math.floor(Math.random() * type);
            }
            else if(xVantage === 1){
                tot += Math.max(Math.floor(Math.random() * type), Math.floor(Math.random() * type));
            }
            else{
                tot += Math.min(Math.floor(Math.random() * type), Math.floor(Math.random() * type));
            }
        }
    }

    return tot;
}