/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
'use strict';
window.addEventListener('DOMContentLoaded', () => {
	const countTimer = deadline => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');



        const getTimeRemaining = () => {
            let dateStop = new Date(deadline),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) % 24;
            return { timeRemaining, hours, minutes, seconds };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            }
        };


        updateClock();
    };

    countTimer('25 april 2020');
});
