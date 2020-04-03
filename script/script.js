'use strict';



//data
let money;

//isNumber?
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


//main object
let appData = {
    income: "",
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
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
    
            appData.income = "У вас высокий уровень дохода";
        
        } else if(this.budgetDay>= 600) {
        
            appData.income = "У вас средний уровень дохода"; 
        
        } else if(this.budgetDay>= 0) {
        
            appData.income = "К сожалению у вас уровень дохода ниже среднего";
        
        } else {
        
            appData.income = "Что то пошло не так";
            
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
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый"+
                    " период через запятую","Комуналка,парковка,такси");
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
    }
};



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

    console.log(appData.addExpenses);

    if(appData.period>0){
        console.log("Цель будет достигнута за: %d месяцев",appData.period);
    } else{
        console.log("Цель не будет достигнута");
    }

    console.log("Бюджет на день "+Math.floor(appData.budgetDay));

    console.log(appData.income);


};


start();





// expensesAmount = appData.getExpensesMonth();

// accumulatedMonth = appData.getAccumulatedMonth();



// const targetMonth = appData.getTargetMonth();

// appData.budgetDay = accumulatedMonth/30;


//console










