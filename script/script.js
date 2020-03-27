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
console.log(budgetDay);