'use strict';



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
    status: "",
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    getBudget : function ()  {
        this.budgetMonth = this.budget-this.getExpensesMonth();
        this.budgetDay = this.budgetMonth/30;
    },
    
    
    
    getTargetMonth : function ()  {
        this.period = Math.ceil(this.mission/this.budgetMonth);
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

    asking: function(){
        this.budget = money;


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
        let addExpenses;
        do{
        addExpenses = prompt("Перечислите возможные расходы за рассчитываемый"+
                    " период через запятую","Комуналка,парковка,такси");
        } while(isNumber(addExpenses)||addExpenses.trim().length === 0);       
        appData.addExpenses=addExpenses.toLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        for(let i = 0; i<2; i++){
    
            let expenses = prompt("Введите обязательную статью расходов?");
            let cost;
            do{
                cost = prompt('Во сколько это обойдется?');
                if(isNumber(cost)){
                    appData.expenses[expenses] = cost;
                }
            }while(!isNumber(cost));
        }
        this.getBudget();
        this.getTargetMonth();
        this.getStatusIncome();
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
    calcSaveMoney: function(){
        return appData.budgetMonth * appData.period;
    }
}


let start = function() {

    //asking and get data
    do{
        money = prompt("Ваш месячный доход?","42500");

    } while(!isNumber(money));

    
    appData.asking();

    //console data
    let dataObject = "Наша программа включает в себя данные:"+"\n";
    for(let key in appData){
        dataObject+= key+" : "+appData[key]+"\n"; 
    }
    console.log(dataObject);
    console.log("Расходы за месяц "+appData.getExpensesMonth());

    //Possible expenses
    let possibleExpenses = appData.addExpenses[0].substring(0,1).toUpperCase()+appData.addExpenses[0].substring(1);
    for(let i = 1; i<appData.addExpenses.length;i++){
        let str = appData.addExpenses[i];
        possibleExpenses+= ", "+str.substring(0,1).toUpperCase()+str.substring(1);
    }
    console.log(possibleExpenses);

    if(appData.period>0){
        console.log("Цель будет достигнута за: %d месяцев",appData.period);
    } else{
        console.log("Цель не будет достигнута");
    }

    console.log("Бюджет на день "+Math.floor(appData.budgetDay));

    console.log(appData.status);


};


start();





// expensesAmount = appData.getExpensesMonth();

// accumulatedMonth = appData.getAccumulatedMonth();



// const targetMonth = appData.getTargetMonth();

// appData.budgetDay = accumulatedMonth/30;


//console










