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

export default toggleMenu;