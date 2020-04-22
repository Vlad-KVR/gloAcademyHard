'use strict';


let start = document.getElementById("start");
let cancel = document.getElementById("cancel");


const toBlockStart = function() {
    start.setAttribute('disabled','true');
};
toBlockStart();

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};





let btnPlus = document.querySelectorAll(".btn_plus");
let incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1];
let depositCheck = document.querySelector("#deposit-check");
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let budgetMonthValue = document.querySelector(".budget_month-value");
let budgetDayValue = document.querySelector(".budget_day-value");
let expensesMonthValue = document.querySelector(".expenses_month-value");
let additionalIncomeValue = document.querySelector(".additional_income-value");
let additionalExpensesValue = document.querySelector(".additional_expenses-value");
let incomePeriodValue = document.querySelector(".income_period-value");
let targetMonthValue = document.querySelector(".target_month-value");
let salaryAmount = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector(".income-amount");
let expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector(".additional_expenses-item");
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector(".period-amount");



const AppData = function (){
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.status = "";
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.getBudget  = function ()  {
    this.budgetMonth = this.budget+this.incomeMonth-this.getExpensesMonth();
    this.budgetDay = this.budgetMonth/30;
};

AppData.prototype.getTargetMonth  = function ()  {
    return Math.ceil(targetAmount.value/this.budgetMonth);
};

AppData.prototype.getStatusIncome  = function ()  {
    if(this.budgetDay>=1200) {

        this.status = "У вас высокий уровень дохода";
    
    } else if(this.budgetDay>= 600) {
    
        this.status = "У вас средний уровень дохода"; 
    
    } else if(this.budgetDay>= 0) {
    
        this.status = "К сожалению у вас уровень дохода ниже среднего";
    
    } else {
    
        this.status = "Что то пошло не так";
        
    } 
};

AppData.prototype.getExpensesMonth  = function ()  {
    let sum =0;
    for(let key in this.expenses){
        sum+=+this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
};

AppData.prototype.getInfoDeposit = function(){
    
    if(this.deposit){
        let percentDeposit; 
        let moneyDeposit;
        do{
            percentDeposit = prompt("Какой годовой процент","10");
        }while(!isNumber(percentDeposit));
        do{
        moneyDeposit = prompt("Какая сумма заложена?",10000);
        }while(!isNumber(moneyDeposit));
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
    }
};

AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.start = function() {

    start.style.display = 'none';
    cancel.style.display = 'inline-block';


    document.querySelector(".data").querySelectorAll("input[type='text']").forEach(function(item){
        item.readOnly = true;
    });
    
    //asking and get data
    console.log(this);
    

    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getStatusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();

};

AppData.prototype.reset = function(){

    cancel.style.display = 'none';
    start.style.display = 'inline-block';
    toBlockStart();

    document.querySelectorAll("input[type='text']").forEach(function(item){
        item.readOnly = false;
        item.value = '';
    });

    this.income= {};
    this.addIncome= [];
    this.expenses= {};
    this.addExpenses= [];
    this.incomeMonth= 0;
    this.status= "";
    this.deposit= false;
    this.percentDeposit= 0;
    this.moneyDeposit= 0;
    this.budget= 0;
    this.budgetDay= 0;
    this.budgetMonth= 0;
    this.expensesMonth= 0;
};

AppData.prototype.showResult = function() {
    const that = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener("input", function(){
        incomePeriodValue.value = that.calcPeriod();
    });

};

AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const that = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            that.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function(){
    const that = this
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
            that.income[itemIncome] = cashIncome;
        }
    });

    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }

};

AppData.prototype.getAddExpenses = function(){
    const that  = this;
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            that.addExpenses.push(item);
        }
    });

};

AppData.prototype.getAddIncome = function(){
    const that = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            that.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.setPeriodAmount = function(){
    periodAmount.innerHTML = this.value;
};

AppData.prototype.visibleStart = function(){
    if(salaryAmount.value !== ''){
    start.removeAttribute('disabled');
    } else{
        alert("Введите месячный доход");
    }
};

AppData.prototype.eventListeners = function(){
    const that = this;
    start.addEventListener("click", that.start.bind(that));
    cancel.addEventListener("click", that.reset.bind(that));
    
    expensesPlus.addEventListener("click", that.addExpensesBlock);
    incomePlus.addEventListener("click", that.addIncomeBlock);
    periodSelect.addEventListener("input",that.setPeriodAmount);
    salaryAmount.addEventListener("change", that.visibleStart);
};

const appData = new AppData();
appData.eventListeners();

