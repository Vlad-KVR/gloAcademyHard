//1
'use strict';
let lang  = prompt("Write language('ru' or 'en'");
let daysOnRu = ['Понедельник','Вторник','Среда','Четверг','Пятница','Субота','Воскресенье'];
let daysOnEn = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

//if
if(lang === 'ru') console.log(daysOnRu);
else if(lang === 'en') console.log(daysOnEn);

//switch
switch(lang){
    case 'ru':
        console.log(daysOnRu);
        break;
    case 'en':
        console.log(daysOnEn);
        break;
}

//array

let daysOnRuAndEn = {"ru":daysOnRu,"en":daysOnEn};
console.log(daysOnRuAndEn[lang]);

//2
let namePerson = prompt("Write your name");

let resultForNamePerson = namePerson === "Артём" ? "директор" : namePerson === "Максим" ? "преподаватель" : "студент";

console.log(resultForNamePerson);