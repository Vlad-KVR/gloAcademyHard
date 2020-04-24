/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */

'use strict';
window.addEventListener('DOMContentLoaded', () => {


	//Таймер
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');



		const getTimeRemaining = () => {
			const dateStop = new Date(deadline),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		};

		// eslint-disable-next-line prefer-const
		let idInterval;
		const updateClock = () => {
			const timer = getTimeRemaining();
			if (timer.timeRemaining <= 0) {
				clearInterval(idInterval);
				timerHours.textContent = '00';
			    timerMinutes.textContent = '00';
			    timerSeconds.textContent = '00';
				return;
			}

			timerHours.textContent = timer.hours.toString().length > 1 ?
				timer.hours :
				'0' + timer.hours;
			timerMinutes.textContent = timer.minutes.toString().length > 1 ?
				timer.minutes :
				'0' + timer.minutes;
			timerSeconds.textContent = timer.seconds.toString().length > 1 ?
				timer.seconds :
				'0' + timer.seconds;
			
		};

		idInterval = setInterval(updateClock, 1000);
        
	};

	countTimer('28 april 2020');


	//Меню 
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};
		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);
		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

	};

	toggleMenu();

	
	//popup

	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		const animationPopup = () => {
			if (window.innerWidth < 768) {
				popup.style.display = 'block';
				return;
			}
			popup.children[0].style.marginLeft = '100%';
			popup.style.marginLeft = '-100%';
			popup.style.display = 'block';
			const idInterval = setInterval(() => {
				if (popup.style.marginLeft === '0%') {
					popup.style.marginLeft = '0%';
					popup.children[0].style.marginLeft = '0%';
					clearInterval(idInterval);
					return;
				}
				const number = Number.parseInt(popup.style.marginLeft) + 2;
				popup.children[0].style.marginLeft = number + '%';
				popup.style.marginLeft = number + '%';
			}, 1);
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', animationPopup);
		});

		popupClose.addEventListener('click', () => {
			popup.style.display = '';
		});

	};
	togglePopup();
});
