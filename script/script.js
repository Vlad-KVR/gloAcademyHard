//1
'use strict';

let arr = [];

for(let i = 0; i<7; i++){
    arr[i] = Math.floor(Math.random()*10)+"234567";
}

for(let i = 0; i<arr.length; i++){
    if(arr[i].charAt(0) === "2" || arr[i].charAt(0) === "4"){
        console.log(arr[i]);
    }
}

for(let i = 2; i<=100; i++){

    let isPrimeNumber = true;
    for(let j = 2; j<8; j++){
        if(i%j===0) {
            isPrimeNumber = false;
            break;
        }
    }

    if(isPrimeNumber || 
        i === 2 || 
        i === 3 ||
        i === 5 ||
        i === 7) console.log(i+" Делители этого числа: 1 и "+i);

}