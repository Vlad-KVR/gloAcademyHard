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

	countTimer('1 may 2020');


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


	//слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			slider = document.querySelector('.portfolio-content');

		//добавление точек
		const addDot = () => {
			for (let i = 0; i < slide.length; i++) {
				const newDot = document.createElement('li');
				newDot.classList.add('dot');
				if (i === 0) {
					newDot.classList.add('dot-active');
				}
				document.querySelector('.portfolio-dots').appendChild(newDot);
			}
		};

		addDot();
		const dot = document.querySelectorAll('.dot');



		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) currentSlide = 0;
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		};

		const startSlide = (time = 3000) => {

			interval = setInterval(autoPlaySlide, time);

		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {

			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide = currentSlide >= slide.length - 1 ? 0 : currentSlide + 1;
			} else if (target.matches('#arrow-left')) {
				currentSlide = currentSlide <= 0 ? slide.length - 1 : currentSlide - 1;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}


			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {

				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) {

				startSlide();
			}
		});

		startSlide(1500);


	};

	slider();


	// смена картинок "Наша команда"
	const changeImg = () => {
		const commandPhoto = document.querySelectorAll('.command__photo');

		const setNewImg = item => {
			const newDataImg = item.src;
			item.src = item.dataset.img;
			item.dataset.img = newDataImg;
		};

		commandPhoto.forEach(item => {
			item.addEventListener('mouseover', () => { setNewImg(item); });
			item.addEventListener('mouseout', () => { setNewImg(item); });
		});



	};

	changeImg();


	//калькулятор
	const calculator = (price = 100) => {

		const inputOnlyNumber = document.querySelectorAll('.calc-item[type=number]'),
			calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');
		
		
		inputOnlyNumber.forEach(item => {
			item.addEventListener('input', () => { 
				item.value = item.value.replace(/\D/g, ''); 
			});
		});

		
		const countSumAnimation = total => {
			let totalText  = +totalValue.textContent;
			const onePercent = total > totalText ? total / 100 : totalText / 100;
			const idInterval = setInterval(() => {
				
				totalText = totalText < total ? totalText + onePercent : totalText - onePercent;

				totalValue.textContent = Math.floor(totalText);

				if ((total + onePercent + 1) > totalText &&
				(total - onePercent - 1) < totalText) {
					totalValue.textContent = Math.round(total);
					clearInterval(idInterval);
					return;
				}

			}, 10);

			
		};

		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

				
			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}
			
			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}


			if (typeValue && squareValue || +totalValue.textContent > 0) countSumAnimation(total);
		};

		

		calcBlock.addEventListener('change', event => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}

		});

	};

	calculator(100);

	//validation-form
	const validationForm = () => {
		const formPhones = document.querySelectorAll('.form-phone'),
			formName = document.querySelectorAll('.form-name'),
			mess = document.querySelector('.mess');


		formPhones.forEach(item => {
			item.addEventListener('input', () => { 
				item.value = item.value.replace(/[^0-9+]/g, ''); 
			});
		});
		[...formName, mess].forEach(item => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/[^А-Яа-я ]/g, '');
			});
		});
	};

	validationForm();


	//send-ajax-form

	const sendForm = () => {
		const errorMessage = 'Что то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
		
		const forms = document.forms;

		const statusMessage = document.createElement('div');
		statusMessage.textContent = 'Тут будет сообщение!';
		statusMessage.style.cssText = 'font-size: 2rem; color: white;';

		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				console.log(request.readyState);
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
				
				
			});

			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			

			request.send(JSON.stringify(body));
		};

		[...forms].forEach(form => {

			form.addEventListener('submit', event => {
				
				event.preventDefault();
				form.appendChild(statusMessage);
				statusMessage.textContent = loadMessage;
				
				const formData = new FormData(form);
				let body = {};

				formData.forEach((val, key) => {
					body[key] = val;
				});

				postData(body, () => {
					statusMessage.textContent = successMessage;
				}, error => {
					console.log(error);
					statusMessage.textContent = errorMessage;
				});

				[...form.elements].forEach(elem => {
					if (elem.tagName.toLowerCase() === 'input') {
						elem.value = '';
					}
				});
			});
		});
		

	};

	sendForm();

});
