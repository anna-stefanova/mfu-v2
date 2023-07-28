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
        let url = '/docs/openExe';
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
        let url = '/docs/openOsk';
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

function printDocument() {
    const printBtns = document.querySelectorAll('#printDoc');
    if (printBtns) {
        printBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let url = '/docs/openFile';
                let data = JSON.stringify({
                    fileName: this.getAttribute('data-name'),
                });
                getAllData(url, data).catch(error => {
                    error.message; // 'An error has occurred: 404'
                });
            });
        });
    }
}

printDocument();



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

            fetch('/docs/api/downloadFile', options)
                .then(resp => {
                    if (resp.status < 200 || resp.status >= 300)
                        throw new Error(`Запрос отклонен со статусом ${resp.status}`)
                    return resp.json();
                })
                .then(data => {
                    document.getElementById('downloadFileForm').reset();
                    message.innerHTML = 'Файл успешно загружен';
                    console.log(data.el);
                    const ul = document.getElementById('filesList');
                    ul.append(addNewFileList(data.el));

                    printDocument();
                    deleteDoc();
                })
                .catch(err => {
                    document.getElementById('downloadFileForm').reset();
                    message.innerHTML = 'Извините, возникли проблемы при загрузке файла. Пожалуйста, попробуйте еще раз'
                });

        });
}

deleteDoc();

const addNewFileList = (el) => {
    const li = document.createElement('li');
    li.setAttribute('data-name', el.path);
    li.setAttribute('data-id', el._id);
    li.classList.add('filesList__item');
    li.innerHTML = innerHtmlLi(el);
    printDocument();
    deleteDoc();

    return li;
}

function innerHtmlLi(data) {
    return `<span>${data.title}</span>
        <div class="listItem__btns" style="display: flex;align-items: center;grid-gap: 20px;">
            <button id="printDoc" class="printDoc" type="button" data-name="${data.path}" title="Распечатать">
                <svg viewBox="0 0 31 31" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_97_58)">
                        <path d="M25.4292 0V8.67203H25.7604C26.8196 8.67203 27.8788 8.67142 28.9381 8.67219C30.2354 8.67313 30.9981 9.43367 30.9986 10.7367C31.0005 14.9836 31.0003 19.2305 30.9987 23.4774C30.9983 24.6266 30.1974 25.4241 29.04 25.4288C27.8698 25.4336 26.6996 25.4313 25.5295 25.4328C25.5103 25.4328 25.4912 25.441 25.4292 25.4552V31H5.57042V25.4297H5.22816C4.15886 25.4297 3.08956 25.4305 2.02026 25.4295C0.783041 25.4282 0.000353865 24.6478 0.000318264 23.4167C0.000194709 19.1699 -0.000555002 14.923 0.000797828 10.6762C0.00118525 9.45866 0.782474 8.67665 2.00126 8.67276C3.07055 8.66935 4.13986 8.67204 5.20916 8.67203H5.57042V0H25.4292ZM25.4299 24.172C26.6258 24.172 27.7844 24.1748 28.943 24.1708C29.5587 24.1687 29.7586 23.9726 29.759 23.3587C29.7614 19.1514 29.7613 14.944 29.7591 10.7366C29.7588 10.121 29.5569 9.92971 28.9386 9.92971C19.9793 9.92968 11.02 9.92968 2.0607 9.92971C1.44046 9.92971 1.24089 10.1182 1.24055 10.7346C1.23829 14.942 1.23823 19.1494 1.24063 23.3568C1.24098 23.971 1.44167 24.1686 2.05645 24.1708C3.14608 24.1748 4.23574 24.1724 5.32539 24.1709C5.40162 24.1708 5.47783 24.1557 5.57965 24.1449V17.391H25.4299V24.172ZM6.84307 29.7408H24.1475V18.607H6.84307V29.7408ZM24.1578 8.65825V1.25926H6.84806V8.65825H24.1578Z"/>
                        <path d="M26.6484 11.7902C27.3179 11.7721 27.9058 12.3432 27.9095 13.0154C27.9132 13.6726 27.3558 14.2376 26.6874 14.2539C26.0215 14.2702 25.4485 13.7455 25.4292 13.1017C25.4069 12.353 25.9115 11.8101 26.6484 11.7902Z"/>
                        <path d="M15.4999 21.0702C17.4676 21.0702 19.4352 21.0702 21.4029 21.0702C21.4634 21.0702 21.524 21.0686 21.5845 21.0706C21.9949 21.0843 22.3022 21.3424 22.3167 21.6847C22.3305 22.0116 22.0228 22.2942 21.6151 22.3264C21.5449 22.332 21.4739 22.3278 21.4033 22.3278C17.4579 22.3279 13.5125 22.3284 9.56714 22.3257C9.41793 22.3256 9.26184 22.3164 9.121 22.2726C8.8413 22.1857 8.68681 21.977 8.7009 21.6835C8.71452 21.3998 8.85057 21.1852 9.1521 21.1233C9.27851 21.0973 9.40819 21.0726 9.53643 21.0724C11.5243 21.0693 13.5121 21.0702 15.4999 21.0702Z"/>
                        <path d="M15.5323 26.0353C17.5386 26.0353 19.5449 26.0349 21.5511 26.0356C21.9459 26.0358 22.1996 26.196 22.2794 26.489C22.3768 26.8466 22.1792 27.2082 21.8005 27.2413C21.2235 27.2918 20.641 27.2905 20.0609 27.2909C17.2316 27.2931 14.4023 27.2883 11.573 27.2864C10.8609 27.2859 10.1489 27.2852 9.43689 27.2876C9.01152 27.2891 8.70133 27.0322 8.69618 26.6673C8.69088 26.2922 8.97358 26.0378 9.42283 26.0368C11.1972 26.0331 12.9716 26.0353 14.746 26.0353C15.0081 26.0353 15.2702 26.0353 15.5323 26.0353Z"/>
                        <path d="M14.2776 23.5528C15.8813 23.5528 17.4849 23.5514 19.0886 23.5536C19.6103 23.5543 19.9242 23.9059 19.7988 24.345C19.7208 24.6183 19.5144 24.7454 19.2492 24.7903C19.1607 24.8054 19.0694 24.8096 18.9794 24.8097C15.8225 24.8106 12.6656 24.8107 9.50867 24.8101C9.0915 24.81 8.80847 24.6509 8.72277 24.3743C8.58346 23.9245 8.89525 23.5582 9.4363 23.5545C10.3339 23.5484 11.2316 23.5528 12.1293 23.5528C12.8454 23.5528 13.5615 23.5528 14.2776 23.5528Z"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_97_58">
                            <rect width="31" height="31" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <button id="deleteDoc" class="deleteDoc" type="button" data-name="${data.path}" data-id="${data._id}" title="Удалить">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M 26.9375 4 C 26.0435 4 25.203813 4.3940781 24.632812 5.0800781 C 24.574813 5.1490781 24.527234 5.2256406 24.490234 5.3066406 L 22.357422 10 L 11 10 C 9.346 10 8 11.346 8 13 L 8 19 C 8 20.654 9.346 22 11 22 L 13 22 L 13 57 C 13 58.654 14.346 60 16 60 L 48 60 C 49.654 60 51 58.654 51 57 L 51 22 L 53 22 C 54.654 22 56 20.654 56 19 L 56 13 C 56 11.346 54.654 10 53 10 L 41.644531 10 L 39.511719 5.3066406 C 39.474719 5.2256406 39.426141 5.1480781 39.369141 5.0800781 C 38.797141 4.3940781 37.957453 4 37.064453 4 L 26.9375 4 z M 26.9375 6 L 37.0625 6 C 37.3225 6 37.569906 6.1003437 37.753906 6.2773438 L 39.447266 10 L 24.552734 10 L 26.246094 6.2773438 C 26.431094 6.1003438 26.6775 6 26.9375 6 z M 11 12 L 53 12 C 53.551 12 54 12.448 54 13 L 54 19 C 54 19.552 53.551 20 53 20 L 11 20 C 10.449 20 10 19.552 10 19 L 10 13 C 10 12.448 10.449 12 11 12 z M 14 14 C 13.448 14 13 14.447 13 15 L 13 17 C 13 17.553 13.448 18 14 18 C 14.552 18 15 17.553 15 17 L 15 15 C 15 14.447 14.552 14 14 14 z M 19 14 C 18.448 14 18 14.447 18 15 L 18 17 C 18 17.553 18.448 18 19 18 C 19.552 18 20 17.553 20 17 L 20 15 C 20 14.447 19.552 14 19 14 z M 24 14 C 23.448 14 23 14.447 23 15 L 23 17 C 23 17.553 23.448 18 24 18 C 24.552 18 25 17.553 25 17 L 25 15 C 25 14.447 24.552 14 24 14 z M 29 14 C 28.448 14 28 14.447 28 15 L 28 17 C 28 17.553 28.448 18 29 18 C 29.552 18 30 17.553 30 17 L 30 15 C 30 14.447 29.552 14 29 14 z M 35 14 C 34.448 14 34 14.447 34 15 L 34 17 C 34 17.553 34.448 18 35 18 C 35.552 18 36 17.553 36 17 L 36 15 C 36 14.447 35.552 14 35 14 z M 40 14 C 39.448 14 39 14.447 39 15 L 39 17 C 39 17.553 39.448 18 40 18 C 40.552 18 41 17.553 41 17 L 41 15 C 41 14.447 40.552 14 40 14 z M 45 14 C 44.448 14 44 14.447 44 15 L 44 17 C 44 17.553 44.448 18 45 18 C 45.552 18 46 17.553 46 17 L 46 15 C 46 14.447 45.552 14 45 14 z M 50 14 C 49.448 14 49 14.447 49 15 L 49 17 C 49 17.553 49.448 18 50 18 C 50.552 18 51 17.553 51 17 L 51 15 C 51 14.447 50.552 14 50 14 z M 15 22 L 49 22 L 49 57 C 49 57.552 48.551 58 48 58 L 16 58 C 15.449 58 15 57.552 15 57 L 15 56 L 38 56 C 38.552 56 39 55.553 39 55 C 39 54.447 38.552 54 38 54 L 15 54 L 15 22 z M 20 28 C 19.448 28 19 28.447 19 29 L 19 41 C 19 41.553 19.448 42 20 42 C 20.552 42 21 41.553 21 41 L 21 29 C 21 28.447 20.552 28 20 28 z M 28 28 C 27.448 28 27 28.447 27 29 L 27 49 C 27 49.553 27.448 50 28 50 C 28.552 50 29 49.553 29 49 L 29 29 C 29 28.447 28.552 28 28 28 z M 36 28 C 35.448 28 35 28.447 35 29 L 35 49 C 35 49.553 35.448 50 36 50 C 36.552 50 37 49.553 37 49 L 37 29 C 37 28.447 36.552 28 36 28 z M 44 28 C 43.448 28 43 28.447 43 29 L 43 33 C 43 33.553 43.448 34 44 34 C 44.552 34 45 33.553 45 33 L 45 29 C 45 28.447 44.552 28 44 28 z M 44 36 C 43.448 36 43 36.447 43 37 L 43 49 C 43 49.553 43.448 50 44 50 C 44.552 50 45 49.553 45 49 L 45 37 C 45 36.447 44.552 36 44 36 z M 20 44 C 19.448 44 19 44.447 19 45 L 19 49 C 19 49.553 19.448 50 20 50 C 20.552 50 21 49.553 21 49 L 21 45 C 21 44.447 20.552 44 20 44 z M 42 54 C 41.448 54 41 54.447 41 55 C 41 55.553 41.448 56 42 56 L 46 56 C 46.552 56 47 55.553 47 55 C 47 54.447 46.552 54 46 54 L 42 54 z"/></svg>
            </button>
        </div>`;
}

function deleteDoc() {
    const deleteBtns = document.querySelectorAll('#deleteDoc');
    if (deleteBtns) {
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const id = this.getAttribute('data-id')

                let url = '/docs/api/deleteFile/' + id;
                let data = JSON.stringify({
                    path: this.getAttribute('data-name')
                });
                let options = {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json"},
                    body: data
                };
                const messageError = document.getElementById('messageError');

                fetch(url, options)
                    .then(resp => {
                        if (resp.status < 200 || resp.status >= 300)
                            throw new Error(`Запрос отклонен со статусом ${resp.status}`)
                        return resp.json();
                    })
                    .then(json => {
                        document.querySelector(`li[data-id='${json._id}']`).remove();
                        printDocument();
                    })
                    .catch(err => {
                        console.log(err);
                        messageError.innerText = 'Извините, возникла ошибка при удалении файла. Пожалуйста, попробуйте еще раз'
                    });
            });
        });
    }

}

