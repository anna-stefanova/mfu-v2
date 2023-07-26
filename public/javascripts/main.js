try {
    const sliderIntro = new Swiper('#mainSwiper', {
        speed: 4000,
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
} catch (e) {
    console.log(e);
}
/* функция добавления ведущих нулей */
/* (если число меньше десяти, перед числом добавляем ноль) */
function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

/* функции получения текущей даты и времени */
function currentDate()
{
    const current_datetime = new Date();
    const day = zero_first_format(current_datetime.getDate());
    const month = zero_first_format(current_datetime.getMonth()+1);
    const year = current_datetime.getFullYear();

    return [day, month, year].join('.');
}
function currentTime()
{
    const current_datetime = new Date();
    const hours = zero_first_format(current_datetime.getHours());
    const minutes = zero_first_format(current_datetime.getMinutes());

    return [hours, minutes].join(':');
}

/* выводим текущую дату и время на сайт в блок с id "current_date_time_block" */
const dateBlock = document.querySelector('#current_date_time_block .date');
if (dateBlock) {
    dateBlock.innerHTML = currentDate();
    setInterval(() => {
        dateBlock.innerHTML = currentDate();
    }, 60000);
}

const timeBlock = document.querySelector('#current_date_time_block .time');
if (timeBlock) {
    timeBlock.innerHTML = currentTime();
    setInterval(() => {
        timeBlock.innerHTML = currentTime();
    }, 1000);
}
 // аккоредеон вопросов и ответов
$(document).ready(function() {
    $('.accordion__item').on('click', '.accordion-item__trigger', function() {
        $('.accordion-item__content').slideUp();
        $('.accordion-item__icon').removeClass('arrow-rotate');
        if($(this).next().is(':hidden')) {
            $(this).next().slideDown();
            $(this).find('.accordion-item__icon').addClass('arrow-rotate');
        } else {
            $(this).next().slideUp();
            $(this).find('.accordion-item__icon').removeClass('arrow-rotate');
        }
    });
});

// открытие приложения на пк - в нашем случае сканера
const btnRunExe = document.getElementById('runExe');
const inputFileName = document.getElementById('inputText');
if (btnRunExe) {
    btnRunExe.addEventListener('click', function (e) {
        e.preventDefault();
        let url = '/print/openExe';
        let user = JSON.stringify({
            openExe: 'openExe'
        });

        getAllData(url, user).catch(error => {
            error.message; // 'An error has occurred: 404'
        });
    })
}
// открытие клавиатуры
if (inputFileName) {
    inputFileName.addEventListener('click', function (e) {
        e.preventDefault();
        let url = '/print/openOsk';
        let data = JSON.stringify({
            openExe: 'openOsk'
        });

        getAllData(url, data).catch(error => {
            error.message; // 'An error has occurred: 404'
        });
    });
}


async function getAllData(url, data) {
    let options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: data
    };
    let response = await fetch(url, options);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    window.location.reload();

}

// открытие файла средствами операционной системы для распечатки
/*
* что нужно доделать:
* 1) менять имя файла, транслитерировать его на латиницу
* 2) добавить возможность удаления
* 3) выводить не больше 15? файлов на страницу
*
* */
const printBtns = document.querySelectorAll('#printDoc');
if (printBtns) {
    printBtns.forEach(btn => {
       btn.addEventListener('click', function (e) {
          e.preventDefault();


           let url = '/print/openFile';
           let data = JSON.stringify({
               fileName: this.getAttribute('data-name'),
           });

           getAllData(url, data).catch(error => {
               error.message; // 'An error has occurred: 404'
           });
       });
    });
}

if (document.getElementById('downloadFileForm')) {
    document.getElementById('downloadFileForm')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            const body = new FormData(e.target);

            const options = {
                method: 'post',
                body
            }
            const message = document.getElementById('message');

            fetch('/print/api/downloadFile', options)
                .then(resp => {
                    if (resp.status < 200 || resp.status >= 300)
                        throw new Error(`Запрос отклонен со статусом ${resp.status}`)
                    return resp.json();
                })
                .then(json => {
                    document.getElementById('downloadFileForm').reset();
                    message.innerHTML = 'Файл успешно загружен';
                })
                .catch(err => {
                    document.getElementById('downloadFileForm').reset();
                    message.innerHTML = 'Извините, возникли проблемы при загрузке файла. Пожалуйста, попробуйте еще раз'
                });

        });
}

