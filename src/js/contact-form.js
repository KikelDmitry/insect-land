//xhr contact form
let contactForms = document.querySelectorAll('.contact-form'),
    submitCounter = 0;
contactForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        this.querySelector('[name="location"]').value = window.location.href + ' (' + document.title + ')';
        
        let stateCont = document.createElement('div');
        stateCont.classList.add('contact-form__state');
        form.append(stateCont);

        if(submitCounter > 0) {
            stateCont.classList.add('is-enough');
            stateCont.innerHTML = 'Если вы действительно человек, и хотите отправить еще одно сообщение - перезагрузите страницу';
            return false;
        } 

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/core/teleSend.php');
        let data = new FormData(this);
        xhr.send(data);
        xhr.onload = function () {
            if (xhr.status != 200) {
                stateCont.classList.add('is-failed');
                stateCont.innerHTML = 'Что-то пошло не так. Попробуем еще раз?';
                stateCont.onclick = function () {
                    this.remove();
                }
                setTimeout(function () {
                    stateCont.remove();
                }, 3000);
            } else if (xhr.status == 200) {
                stateCont.classList.add('is-success');
                stateCont.innerHTML = 'Удалось. Спасибо.';
                //for cute robo at home page
                let roboMsg = document.querySelector('.robot-helper__msg');
                if(roboMsg) {
                    roboMsg.innerHTML = 'Спасибо, я передам Ваше сообщение 😉';
                }
                submitCounter++;
                setTimeout(function () {
                    stateCont.remove();
                    modalClose();
                }, 3000);
            }
            form.reset();
        }
    })
})