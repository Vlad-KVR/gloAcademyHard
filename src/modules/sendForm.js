'use strict';
const sendForm = () => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    
    const forms = document.forms;

    const statusMessage = document.createElement('div');
    statusMessage.textContent = 'Тут будет сообщение!';
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    const postData = formData => fetch('../server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

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

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error("status response not 200");
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {
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

export default sendForm;