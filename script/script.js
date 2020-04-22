'use strict';


const start = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    btnPlus = document.querySelectorAll(".btn_plus"),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector("#deposit-check"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    budgetMonthValue = document.querySelector(".budget_month-value"),
    budgetDayValue = document.querySelector(".budget_day-value"),
    expensesMonthValue = document.querySelector(".expenses_month-value"),
    additionalIncomeValue = document.querySelector(".additional_income-value"),
    additionalExpensesValue = document.querySelector(".additional_expenses-value"),
    incomePeriodValue = document.querySelector(".income_period-value"),
    targetMonthValue = document.querySelector(".target_month-value"),
    salaryAmount = document.querySelector(".salary-amount"),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector(".income-amount"),
    expensesTitle = document.querySelector(".expenses-title"),
    additionalExpensesItem = document.querySelector(".additional_expenses-item"),
    targetAmount = document.querySelector(".target-amount"),
    periodSelect = document.querySelector(".period-select"),
    periodAmount = document.querySelector(".period-amount"),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

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

    getBudget() {

        const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
        this.budgetMonth = this.budget+this.incomeMonth-this.getExpensesMonth() + monthDeposit;
        this.budgetDay = this.budgetMonth/30;
    }
    
    getTargetMonth() {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }
    
    getStatusIncome() {
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

    getExpensesMonth() {
        let sum =0;
        for(let key in this.expenses){
            sum+=+this.expenses[key];
        }
        this.expensesMonth = sum;
        return sum;
    }
    
    getInfoDeposit() {
        
        if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    getExpenses() {
        const that = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                that.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    getIncome() {
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
    
    getAddExpenses() {
        const that  = this;
        const addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                that.addExpenses.push(item);
            }
        });
    
    }
    
    getAddIncome() {
        const that = this;
        additionalIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                that.addIncome.push(itemValue);
            }
        });
    }

    setPeriodAmount() {
        periodAmount.innerHTML = periodSelect.value;
    }
    
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    
    start() {
        
        
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
        this.getInfoDeposit();
        this.getBudget();
    
        this.showResult();
    
    }
    
    reset() {
    
        cancel.style.display = 'none';
        start.style.display = 'inline-block';
        AppData.toBlockStart();
        periodSelect.value = 1;
        this.setPeriodAmount();

        depositCheck.checked = false;
        this.depositHandler();
    
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
    
    showResult() {
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
    
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }
    
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    }

    visibleStart() {
        if(salaryAmount.value !== ''){
        start.removeAttribute('disabled');
        } else{
            alert("Введите месячный доход");
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other'){
            console.log(valueSelect);
            //homework
        } else {
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else{
            depositBank.style.display = '';
            depositAmount.style.display = '';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    
    eventListeners() {
        start.addEventListener("click", this.start.bind(this));
        cancel.addEventListener("click", this.reset.bind(this));
        
        expensesPlus.addEventListener("click", this.addExpensesBlock);
        incomePlus.addEventListener("click", this.addIncomeBlock);
        periodSelect.addEventListener("input",this.setPeriodAmount);
        salaryAmount.addEventListener("change", this.visibleStart);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}



const appData = new AppData();
appData.eventListeners();

