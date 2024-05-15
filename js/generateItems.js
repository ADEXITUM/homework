function generateItems(count) {
    var container = document.getElementById('itemsContainer');

    for (var i = 0; i < count; i++) {
        var card = document.createElement('div');
        card.classList.add('card');

        var image = document.createElement('img');
        image.src = './assets/images/placeholder_300x300.png';
        image.alt = 'Placeholder Image';

        var title = document.createElement('h2');
        title.textContent = 'Товар ' + (i + 1);

        var description = document.createElement('p');
        description.textContent = 'Описание ' + (i + 1);

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);

        container.appendChild(card);
    }
}

generateItems(10);