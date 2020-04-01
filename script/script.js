'use strict';

//data
let money, income, addExpenses, deposit, mission, period;

money = +prompt("Ваш месячный доход?");
income = 'Форекс';
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
mission = 1234567;
period = 7;

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");



//Functions
const showTypeOf = function (data){
    return typeof(data);
};

const getExpensesMonth = function ()  {
    return amount1+amount2;
};

const getAccumulatedMonth = function ()  {
    return money-getExpensesMonth();
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function ()  {
    return Math.ceil(mission/accumulatedMonth);
};

const getStatusIncome = function ()  {
    return income !== 'underfined'; 
};

let budgetDay = accumulatedMonth/30;


//console
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));

console.log("Бюджет на месяц "+accumulatedMonth);

console.log(addExpenses.toLowerCase().split(', '));

console.log("Цель будет достигнута за: %d месяцев",getTargetMonth());

console.log("Бюджет на день "+Math.floor(budgetDay));

console.log("Есть ли дополнительный доход: "+getStatusIncome());


//Budget
if(budgetDay>=1200) {

    console.log("У вас высокий уровень дохода");

} else if(budgetDay>= 600) {

    console.log("У вас средний уровень дохода"); 

} else if(budgetDay>= 0) {

    console.log("К сожалению у вас уровень дохода ниже среднего");

} else {

    console.log("Что то пошло не так");
    
}





