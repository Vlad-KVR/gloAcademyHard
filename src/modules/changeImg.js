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

export default changeImg;