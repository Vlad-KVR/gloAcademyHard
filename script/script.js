'use strict';


let calculationStart = document.getElementById("start");
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
let incomeItem = document.querySelectorAll('.income-items');





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
        appData.budgetMonth = appData.budget+appData.incomeMonth-appData.getExpensesMonth();
        appData.budgetDay = appData.budgetMonth/30;
    },
    
    
    
    getTargetMonth : function ()  {
        return Math.ceil(targetAmount.value/appData.budgetMonth);
    },
    
    
    getStatusIncome : function ()  {
        if(this.budgetDay>=1200) {
    
            appData.status = "У вас высокий уровень дохода";
        
        } else if(this.budgetDay>= 600) {
        
            appData.status = "У вас средний уровень дохода"; 
        
        } else if(this.budgetDay>= 0) {
        
            appData.status = "К сожалению у вас уровень дохода ниже среднего";
        
        } else {
        
            appData.status = "Что то пошло не так";
            
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
        
        if(appData.deposit){
            let percentDeposit; 
            let moneyDeposit;
            do{
                percentDeposit = prompt("Какой годовой процент","10");
            }while(!isNumber(percentDeposit));
            do{
            moneyDeposit = prompt("Какая сумма заложена?",10000);
            }while(!isNumber(moneyDeposit));
            appData.percentDeposit = percentDeposit;
            appData.moneyDeposit = moneyDeposit;
        }
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },


    start: function() {

        //asking and get data
        
        if(salaryAmount.value === ''){
            alert("Ошибка, поле 'Месячный доход' должно быть заполнено!");
            return;
        }
    
        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getStatusIncome();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
        // appData.asking();
    
        //console data
        // let dataObject = "Наша программа включает в себя данные:"+"\n";
        // for(let key in appData){
        //     dataObject+= key+" : "+appData[key]+"\n"; 
        // }
    
        // //Possible expenses
        // let possibleExpenses = appData.addExpenses[0].substring(0,1).toUpperCase()+appData.addExpenses[0].substring(1);
        // for(let i = 1; i<appData.addExpenses.length;i++){
        //     let str = appData.addExpenses[i];
        //     possibleExpenses+= ", "+str.substring(0,1).toUpperCase()+str.substring(1);
        // }
    
        // if(appData.period>0){
        //     console.log("Цель будет достигнута за: %d месяцев",appData.period);
        // } else{
        //     console.log("Цель не будет достигнута");
        // }
    },
    showResult: function() {

        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.round(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();

    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
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
        console.log(appData.expenses);
    },
    getIncome: function(){

        if(confirm("Есть ли у вас дополнительный заработок")) {
            let itemIncome;
            let cashIncome;
            do{
            itemIncome = prompt("Какой у вас дополнительный заработок?","Таксую");
            } while(isNumber(itemIncome)||itemIncome.trim().length === 0);
            do{
            cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?","10000");
            } while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
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
};

calculationStart.addEventListener("click", appData.start);

expensesPlus.addEventListener("click", appData.addExpensesBlock);

