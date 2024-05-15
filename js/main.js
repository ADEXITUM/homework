let mysteryCode = '';
let superMysteryCode = '';

function createGiftBoxImage() {    
    var hiddenGift = document.createElement('div');

    hiddenGift.id = 'gift-icon';

    var hiddenGiftSvg = document.createElement('img');    
    hiddenGiftSvg.src = './assets/gifs/mystery.gif';
    hiddenGiftSvg.alt = 'Gift Icon';
    hiddenGiftSvg.className = 'mystery';

    hiddenGift.appendChild(hiddenGiftSvg);

    hiddenGift.onclick = mysteryDialogue;

    document.body.appendChild(hiddenGift);
}

function initSecrets() {
    mysteryCode = crypto.randomUUID();
    superMysteryCode = crypto.randomUUID();

    console.log(mysteryCode);
    localStorage.setItem('super_mystery_code', superMysteryCode);
}

function checkMysteryCode() {    
    const mysteryCodeInput = document.getElementById('mysteryCode').value;
    
    if (mysteryCodeInput === mysteryCode) {
        Swal.fire({
            title: 'Поздравляю, Вы нашли секрет!',
            text: 'Поставьте автомат :)',
            icon: 'success'
        }).then(() => {
            mysteryDialogue();
        });
    } else {
        Swal.fire({
            title: 'Ошибка!',
            text: 'Код неверный!',
            icon: 'error'
        }).then(() => {
            mysteryDialogue();
        });
    }      
}

function checkSuperMysteryCode() {    
    const superMysteryCodeInput = document.getElementById('superMysteryCode').value;

    if (superMysteryCodeInput === localStorage.getItem('super_mystery_code')) {
        Swal.fire({
            title: 'Поздравляю, Вы нашли секрет!',
            text: 'Ну пожалуйста :)',
            icon: 'success'
        }).then(() => {
            mysteryDialogue();
        });;
    } else {
        Swal.fire({
            title: 'Ошибка!',
            text: 'Код неверный!',
            icon: 'error'
        }).then(() => {
            mysteryDialogue();
        });;
    }
}

function mysteryDialogue() {    
    Swal.fire({
        title: 'Здесь спрятаны секреты!',
        html:
          '<input id="mysteryCode" class="swal2-input" placeholder="Секретный код">' +
          '<button class="swal2-cancel swal2-styled" onclick="checkMysteryCode()">OK</button>' +
          '<input id="superMysteryCode" class="swal2-input" placeholder="СУПЕР секретный код">' +
          '<button class="swal2-cancel swal2-styled" onclick="checkSuperMysteryCode()">OK</button>',
        icon: 'question',
        confirmButtonText: 'Выйти',
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            document.getElementById('gift-icon').classList.remove('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    createGiftBoxImage();
    initSecrets();

    // Без проверки при каждом переходе на страницу где подключен скрипт будет выскакивать диалог
    if (!localStorage.getItem('viewed_welcome_dialog')) {
        setTimeout(function() {
            mysteryDialogue();
            localStorage.setItem('viewed_welcome_dialog', true);
        }, 1300)
    }
});
