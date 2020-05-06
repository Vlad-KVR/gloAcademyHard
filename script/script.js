/* eslint-disable no-useless-concat */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
'use strict';

const API_KEY = "trnsl.1.1.20200506T115836Z.72341e10df2043fd.d1156e0c2408992f3085bed9e835e049e67e48c1";
const url = "https://translate.yandex.net/api/v1.5/tr.json/translate";


const getData = url => {
	return fetch(url);
};

//переключение языков

const toggleLanguage = () => {

	const buttonToggle = document.querySelector('.arrow');

	const toggle = () => {
		const languages = document.querySelectorAll('.language > h1');
		const first = languages[0].textContent;
		const second = languages[1].textContent;

		languages.forEach(item =>{
			item.parentNode.classList.toggle('ru');
			item.parentNode.classList.toggle('en');
		});

		languages[0].textContent = second;
		languages[1].textContent = first;
	};

	buttonToggle.addEventListener('click', toggle);
};

toggleLanguage();


const translate = () => {

	const form = document.querySelector('form');

	const textFrom = document.getElementById('from');

	const textTo = document.getElementById('to');

	const lang = document.querySelector('.language').classList.contains('ru') ? "ru-en" : "en-ru";



	form.addEventListener('submit', event => {
		event.preventDefault();
		
		getData(encodeURI(url + 
			"?" + "key=" + API_KEY +
			"&" + "text=" + textFrom.value +
			"&" + "lang=" + lang))
			.then(response => {
				return response.json();
			})
			.then(response => {
				textTo.value = response.text;
			});
		
	});
};

translate();
