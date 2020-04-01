'use strict';
let money, income, addExpenses, deposit, mission, period;

money = 1200;
income = 'Форекс';
addExpenses = 'интернет, телевидение, коммуналка';
deposit = true;
mission = 1234567;
period = 7;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log('Период равен %d месяцев',period);
console.log('Цель заработать %d рублей',mission);

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money/30;

//lesson03

money = +prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = !!prompt("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = +prompt("Во сколько это обойдется?");

let budgetMonth = money-amount1-amount2;
console.log("Бюджет на месяц "+ budgetMonth);

console.log("Цель будет достигнута за: %d месяцев",Math.ceil(mission/budgetMonth));

budgetDay = budgetMonth/30;
console.log("Бюджет на день "+Math.floor(budgetDay));

if(budgetDay>=1200) {

    console.log("У вас высокий уровень дохода");

} else if(budgetDay>= 600) {

    console.log("У вас средний уровень дохода"); 

} else if(budgetDay>= 0) {

    console.log("К сожалению у вас уровень дохода ниже среднего");

} else {

    console.log("Что то пошло не так");
    
}
