/* eslint-disable strict */
/* eslint-disable no-unused-vars */
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

export default countTimer;