'use strict';


const start = document.getElementById("start");
const cancel = document.getElementById("cancel");
const btnPlus = document.querySelectorAll(".btn_plus");
const incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1];
const depositCheck = document.querySelector("#deposit-check");
const additionalIncomeItem = document.querySelectorAll(".additional_income-item");
const budgetMonthValue = document.querySelector(".budget_month-value");
const budgetDayValue = document.querySelector(".budget_day-value");
const expensesMonthValue = document.querySelector(".expenses_month-value");
const additionalIncomeValue = document.querySelector(".additional_income-value");
const additionalExpensesValue = document.querySelector(".additional_expenses-value");
const incomePeriodValue = document.querySelector(".income_period-value");
const targetMonthValue = document.querySelector(".target_month-value");
const salaryAmount = document.querySelector(".salary-amount");
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector(".income-amount");
const expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector(".additional_expenses-item");
const targetAmount = document.querySelector(".target-amount");
const periodSelect = document.querySelector(".period-select");
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector(".period-amount");



class AppData {
    constructor(){
    AppData.toBlockStart();
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
    }

    static isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    static toBlockStart() {
        start.setAttribute('disabled','true');
    }

    getBudget (){
        this.budgetMonth = this.budget+this.incomeMonth-this.getExpensesMonth();
        this.budgetDay = this.budgetMonth/30;
    }
    
    getTargetMonth (){
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }
    
    getStatusIncome (){
        if(this.budgetDay>=1200) {
    
            this.status = "У вас высокий уровень дохода";
        
        } else if(this.budgetDay>= 600) {
        
            this.status = "У вас средний уровень дохода"; 
        
        } else if(this.budgetDay>= 0) {
        
            this.status = "К сожалению у вас уровень дохода ниже среднего";
        
        } else {
        
            this.status = "Что то пошло не так";
            
        } 
    }

    getExpensesMonth (){
        let sum =0;
        for(let key in this.expenses){
            sum+=+this.expenses[key];
        }
        this.expensesMonth = sum;
        return sum;
    }
    
    getInfoDeposit (){
        
        if(this.deposit){
            let percentDeposit; 
            let moneyDeposit;
            do{
                percentDeposit = prompt("Какой годовой процент","10");
            }while(!AppData.isNumber(percentDeposit));
            do{
            moneyDeposit = prompt("Какая сумма заложена?",10000);
            }while(!AppData.isNumber(moneyDeposit));
            this.percentDeposit = percentDeposit;
            this.moneyDeposit = moneyDeposit;
        }
    }

    getExpenses (){
        const that = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                that.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    getIncome (){
        const that = this
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                that.income[itemIncome] = cashIncome;
            }
        });
    
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    
    }
    
    getAddExpenses (){
        const that  = this;
        const addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                that.addExpenses.push(item);
            }
        });
    
    }
    
    getAddIncome (){
        const that = this;
        additionalIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                that.addIncome.push(itemValue);
            }
        });
    }

    setPeriodAmount (){
        periodAmount.innerHTML = periodSelect.value;
    }
    
    calcPeriod (){
        return this.budgetMonth * periodSelect.value;
    }
    
    start (){
        
        
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
    
    }
    
    reset (){
    
        cancel.style.display = 'none';
        start.style.display = 'inline-block';
        AppData.toBlockStart();
        periodSelect.value = 1;
        this.setPeriodAmount();
    
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
    }
    
    showResult (){
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
    
    }
    
    addExpensesBlock (){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }
    
    addIncomeBlock (){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    }

    visibleStart (){
        if(salaryAmount.value !== ''){
        start.removeAttribute('disabled');
        } else{
            alert("Введите месячный доход");
        }
    }
    
    eventListeners (){
        const that = this;
        start.addEventListener("click", that.start.bind(that));
        cancel.addEventListener("click", that.reset.bind(that));
        
        expensesPlus.addEventListener("click", that.addExpensesBlock);
        incomePlus.addEventListener("click", that.addIncomeBlock);
        periodSelect.addEventListener("input",that.setPeriodAmount);
        salaryAmount.addEventListener("change", that.visibleStart);
    }
}



const appData = new AppData();
appData.eventListeners();

