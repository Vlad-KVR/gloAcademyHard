/* eslint-disable no-loop-func */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
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
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);
		menu.addEventListener('click', () => {
			let target = event.target;

			if (!target.classList.contains('close-btn')) {
				target = target.closest('li');
			}

			if (target) handlerMenu();
		});
	};

	toggleMenu();


	//popUp
	const togglePopUp = () => {
		const popUp = document.querySelector('.popup'),
			popUpBtn = document.querySelectorAll('.popup-btn');

		const animationPopUp = () => {

			if (window.innerWidth < 768) {
				popUp.style.display = popUp.style.display === 'block' ? '' : 'block';
				return;
			}

			let number = popUp.style.display === 'block' ? '2%' : '-100%';
			popUp.children[0].style.marginLeft = number;
			popUp.style.marginLeft = number;
			popUp.style.display = 'block';

			const idInterval = setInterval(() => {

				if (popUp.style.marginLeft === '0%' ||
					popUp.style.marginLeft === '100%') {

					popUp.style.marginLeft = '0%';
					popUp.children[0].style.marginLeft = '0%';
					clearInterval(idInterval);
					return;

				}

				number = Number.parseInt(popUp.style.marginLeft) + 2;
				popUp.children[0].style.marginLeft = number + '%';
				popUp.style.marginLeft = number + '%';

			}, 10);

		};

		popUpBtn.forEach(elem => {
			elem.addEventListener('click', animationPopUp);
		});

		// popUpClose.addEventListener('click', () => {
		// 	animationPopUp();
		// 	setTimeout(() => { popUp.style.display = ''; }, 1000);
		// });

		popUp.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				target = null;
			} else {
				target = target.closest('.popup-content');
			}

			if (!target) {
				animationPopUp();
				setTimeout(() => { popUp.style.display = ''; }, 500);
			}

		});

	};

	togglePopUp();


	//Табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tabs = tabHeader.querySelectorAll('.service-header-tab'),
			tabContents = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContents.length; i++) {
				if (index === i) {
					tabs[i].classList.add('active');
					tabContents[i].classList.remove('d-none');
				} else {
					tabs[i].classList.remove('active');
					tabContents[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');


			if (target) {
				tabs.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}

				});

			}

		});
	};

	tabs();
});
