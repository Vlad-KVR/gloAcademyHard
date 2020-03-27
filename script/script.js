let num = 266219;

let multiplication = num.toString()[0];

for (let i = 1; i<num.toString().length; i++){
    multiplication *= num.toString()[i];
}

console.log(multiplication);

console.log((multiplication ** 3).toString().substring(0,2));