'use strict';

const hello = document.createElement('p'),
	dayWeek = document.createElement('p'),
	currentTime = document.createElement('p'),
	howMuchLeftNewYear = document.createElement('p');
document.body.append(hello);
document.body.append(dayWeek);
document.body.append(currentTime);
document.body.append(howMuchLeftNewYear);

const message = () => {

	const updateTime = today => {
		const hours = today.getHours(),
			minutes = today.getMinutes(),
			seconds = today.getSeconds(),
			day = today.getDay(),
			newYear = new Date("1 january " + (today.getFullYear() + 1));

		if (hours < 6 && hours >= 0 || hours >= 23) {
			hello.textContent = "Доброй ночи";
		} else if (hours < 12 && hours >= 6) {
			hello.textContent = "Доброе утро";
		} else if (hours < 18 && hours >= 12) {
			hello.textContent = "Добрый день";
		} else if (hours < 24 && hours >= 18) {
			hello.textContent = "Добрый вечер";
		}

		let dayWeekText;
		switch (day) {
		case 0: dayWeekText = "Воскресенье";
			break;
		case 1: dayWeekText = "Понедельник";
			break;
		case 2: dayWeekText = "Вторник";
			break;
		case 3: dayWeekText = "Среда";
			break;
		case 4: dayWeekText = "Четверг";
			break;
		case 5: dayWeekText = "Пятница";
			break;
		case 6: dayWeekText = "Субота";
			break;
		}

		dayWeek.textContent = "Сегодня: " + dayWeekText;
		howMuchLeftNewYear.textContent = "До нового года осталось " +
    Math.floor((newYear - today) / 1000 / 60 / 60 / 24) + " дней";
		currentTime.textContent = "Текущее время:" + new Date().toLocaleTimeString('en').slice(0, 10);
	};


	updateTime(new Date());
	setInterval(updateTime, 1000, new Date());
};

message();

