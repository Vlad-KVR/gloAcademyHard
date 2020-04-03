'use strict';

let week = ['Понедельник','Вторник','Среда','Четверг','Пятница','Субота','Воскресенье'];
let today = new Date();

let div = document.getElementsByClassName('week');

for(let i = 0; i<week.length; i++){
    let day = document.createElement('p');
    day.style.fontSize = "32px";
    day.innerHTML = week[i];
    if(i===5||i===6){
        day.innerHTML = "<em>"+week[i]+"</em>";
    }
    if(today.getDay()===i+1||(today.getDay()===0&&i===6)){
        day.innerHTML="<strong>"+week[i]+"</strong";
    }
    document.body.append(day);
}