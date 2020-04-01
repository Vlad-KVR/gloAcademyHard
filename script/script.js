'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

//data
let money, income, addExpenses, deposit, mission, period;


let start = function() {

    do{
        money = prompt("Ваш месячный доход?");

    } while(!isNumber(money));

};
start();


income = 'Форекс';
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый"+
                    " период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
mission = 123456;
period = 7;

let expenses = [];



//Functions
const showTypeOf = function (data){
    return typeof(data);
};

const getExpensesMonth = function ()  {
    let sum =0;

    for(let i = 0; i<2; i++){

        expenses[i] = prompt("Введите обязательную статью расходов?");
        let cost;
        do{
            cost = prompt('Во сколько это обойдется?');
        }while(!isNumber(cost));
        sum+=+cost;
    }
    
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function ()  {
    return money-expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function ()  {
    return Math.ceil(mission/accumulatedMonth);
};
const targetMonth = getTargetMonth();

let budgetDay = accumulatedMonth/30;

const getStatusIncome = function ()  {
    if(budgetDay>=1200) {

        return "У вас высокий уровень дохода";
    
    } else if(budgetDay>= 600) {
    
        return "У вас средний уровень дохода"; 
    
    } else if(budgetDay>= 0) {
    
        return "К сожалению у вас уровень дохода ниже среднего";
    
    } else {
    
        return "Что то пошло не так";
        
    } 
};



//console
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log("Бюджет на месяц "+accumulatedMonth);

console.log(addExpenses.toLowerCase().split(', '));

if(targetMonth>0){
    console.log("Цель будет достигнута за: %d месяцев",getTargetMonth());
} else{
    console.log("Цель не будет достигнута");
}

console.log("Бюджет на день "+Math.floor(budgetDay));

console.log(getStatusIncome());







