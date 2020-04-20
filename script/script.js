'use strict';


let start = document.getElementById("start");
let cancel = document.getElementById("cancel");

start.style.display = 'none';



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




//data
let money;

//isNumber?
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


//main object
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    status: "",
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    getBudget : function ()  {
        this.budgetMonth = this.budget+this.incomeMonth-this.getExpensesMonth();
        this.budgetDay = this.budgetMonth/30;
    },
    
    
    
    getTargetMonth : function ()  {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    },
    
    
    getStatusIncome : function ()  {
        if(this.budgetDay>=1200) {
    
            this.status = "У вас высокий уровень дохода";
        
        } else if(this.budgetDay>= 600) {
        
            this.status = "У вас средний уровень дохода"; 
        
        } else if(this.budgetDay>= 0) {
        
            this.status = "К сожалению у вас уровень дохода ниже среднего";
        
        } else {
        
            this.status = "Что то пошло не так";
            
        } 
    },

    getExpensesMonth : function ()  {
        let sum =0;
        for(let key in this.expenses){
            sum+=+this.expenses[key];
        }
        this.expensesMonth = sum;
        return sum;
    },
    getInfoDeposit: function(){
        
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
    },
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },


    start: function() {

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
    
    },

    reset: function(){

        cancel.style.display = 'none';

        document.querySelectorAll("input[type='text']").forEach(function(item){
            item.readOnly = false;
            item.value = '';
        });

        appData.income= {};
        appData.addIncome= [];
        appData.expenses= {};
        appData.addExpenses= [];
        appData.incomeMonth= 0;
        appData.status= "";
        appData.deposit= false;
        appData.percentDeposit= 0;
        appData.moneyDeposit= 0;
        appData.budget= 0;
        appData.budgetDay= 0;
        appData.budgetMonth= 0;
        appData.expensesMonth= 0;
    },

    showResult: function() {

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.round(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener("input", function(){
            incomePeriodValue.value = appData.calcPeriod();
        });

    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){

        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }

    },
    getAddExpenses: function(){

        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });

    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    
    setPeriodAmount: function(){
        periodAmount.innerHTML = this.value;
    },

    visibleStart: function(){
        if(salaryAmount.value !== ''){
        start.style.display = 'inline-block';
        }
    },
};

start.addEventListener("click", appData.start.bind(appData));
cancel.addEventListener("click", appData.reset.bind(appData));

expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input",appData.setPeriodAmount);
salaryAmount.addEventListener("change", appData.visibleStart);