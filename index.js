console.log("надо писать скрипт");

// присвоение имени пользователя
let user = 'ashavleyko';

// создаем экземпляр класса
let apiCats = new Api(user);

// получаем элементы с html-разметки
// со знака $ начинается переменная

$modalFormAdd = document.querySelector('#modalFormAdd'); // модальное окно добавления

$modalFormAdd2 = document.querySelector('#modalFormAdd2') // модальное окно для кнопки ABOUT

$modal_div_id = document.querySelector('[data-div_modal_4="modal_div_id"]');

$card_view = document.querySelector('#card_view'); // секция отображения карточек


// // создать еще 1 переменную?????

// code ->

// формирование html-карточек
let htmlCard = (cat) =>
    `<div class="card" data-cardid=${cat.id}>
    <div class="img_card" style="background-image: url(${cat.image})"></div>
    <h3>${cat.name}</h3>
    <p>Age ${cat.age} years</p>
    <button data-btn="description" class="cssButton_2">About cat</button>
    <button class="basket cssButton_2" data-btn="delete">Delete</button>
</div>`

// формирование -html-информации по карточке
let htmlInfoByThisCard = (someObjectFromServer) =>
    `<div data-id_object id = ${someObjectFromServer.id} >

    
    <div class="someObjectFromServer" style="background-image: url(${someObjectFromServer.image})" ></div>
    <div>id: ${someObjectFromServer.id}</div>
    <div>Description: ${someObjectFromServer.description}</div>
    <div>Age: ${someObjectFromServer.age}</div>
    <div>Favorite: ${someObjectFromServer.favorite}</div>
    <div>Rate: ${someObjectFromServer.rate}</div>
    </div>
    <div>
    </div>`


// async/await обработка ответов сервера

// показать карточки
const getCards = async function () {
    try {
        const res = await apiCats.getCards();
        // console.log(res);
        const data = await res.json();
        // console.log(data);

        updateCard(data);
        return data;
    } catch (error) {
        alert(`Ошибка: ${error}`)
    }
};

// добавить карточку
const addCard = async (body) => {
    try {

        const res = await apiCats.addCard(body);
        const data = await res.json();
        console.log(data);
        return data;

    } catch (error) {
        alert(`Ошибка: ${error}`) // alert("Ошибка:" error)
    }
};

// async await удаления функция

const deleteButton = async (numberid) => {
    try {
        const res = await apiCats.deleteCardById(numberid)
        const data = await res.json();
        console.log(res);
        console.log(data);
        alert(data.message); // доступ по ключу к messege у объекта
        return numberid;
    } catch (error) {
        // alert(`Ошибка удаления ${error}`)
    }


};

//
// async await функция вытаскивания информации по котейке
// эта информация в async функции (берется из слушателя на форму)
// (numberid) 66 строка /(body) 51 строка / () 36 строка

const getInfoAboutId = async function (id) {
    try {
        const res = await apiCats.getInfoAboutId(id);
        // console.log(res);
        const data = await res.json();
        // console.log(data);

        madeInfoForModalWindow(data);

        return data;

    } catch (error) {
        alert(`Ошибка getInfoAboutId следующая: ${error}`);
    }
};

//
//
//
//
// async await функция для редактирования карты по id
const editCard = async function (body, id) {
    try {

        // ?? тут по аналогии с const delete - 2 аргумента указываем же // выше
        const res = await apiCats.editCard(body, id);
        console.log(res);
        // а нужно ли нам тут к json формату приводить?
        const data = await res.json();
        console.log(data);
        // id же надо вернуть, или body тоже хм
        return id;

    } catch (error) {
        alert(`Ошибка editCard следующая: ${error}`);
    }
};


//
//
//
// /////////////добавить закрытие  окна по нажатию с помощью closest()

// слушатель на весь документ
document.addEventListener('click', (event) => {


    let div2 = event.target.dataset.background_of_modal;
    console.log('TARGET BY data-background_of_modal');

    let key = event.target.dataset.btn;
    console.log(key);
    switch (key) {
        case 'show':
            getCards();
            break;

        case 'addCardForm':
            $modalFormAdd.classList.remove('hidden')
            break;


        case 'addFormClose':
            $modalFormAdd.classList.add('hidden');

            $modalFormAdd2.classList.add('hidden');

            break;

        // для кнопки delete    
        case 'delete':
            let $id = event.target.closest('div').dataset.cardid;
            // const $id2 = $id.dataset.cardid;

            const numberid = Number($id);
            console.log(numberid);
            console.log('я нажал кнопку делета');
            deleteButton(numberid);
            event.target.closest('div').remove();

            break;


        // для кнопки ABOUT
        case 'description':
            $modalFormAdd2.classList.remove('hidden');

            let $descript_by_id = Number(event.target.closest('div').dataset.cardid);

            console.log($descript_by_id);
            getInfoAboutId($descript_by_id);
            break;





        // для кнопки РЕДАКТИРОВАТЬ
        // case 'addFormAdd2':
        //     getInfoAboutId();
        //     // /////+editCard();
        //     break;



        default:
            break;
    }

    //
    //
    // для закрытия второй модалки доп.информации
    // и одновременно для закрытия первой модалки
    switch (div2) {
        case 'data_background_div2':
            console.log('hello world!!!!!');
            $modalFormAdd2.classList.add('hidden');
            $modalFormAdd.classList.add('hidden');

            break;
    };
})




// слушатель на форму добавления
document.forms.addFormName.addEventListener('submit', (event) => {
    // console.log(event.target);
    event.preventDefault();
    // const formmData = new FormData(event.target).entries();
    // console.log(formmData);
    let data = Object.fromEntries(new FormData(event.target).entries());
    console.log(data);
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    addCard(data);
    // console.log(data)
    document.querySelector('#addFormId').reset();
    $modalFormAdd.classList.add('hidden')
})


//
//
//
// функция вормирования карточек


function updateCard(data) {
    // console.log(data);
    $card_view.replaceChildren();
    data.forEach(cat => $card_view.insertAdjacentHTML('beforeend', htmlCard(cat)));

    // data.forEach(card => console.log(card))
    // data.forEach(cat => $card_view.insertAdjacentHTML("beforeend", testHtml(cat)));
};

// [1,2,3,4,5,6]
// dataModal тут объект
function madeInfoForModalWindow(dataModal) {
    // dataModal = 
    $modal_div_id.insertAdjacentHTML('beforeend', htmlInfoByThisCard(dataModal));

};


// убираю ноду HTML
// $modal_div_id.remove(div);//

// function myFunction() {
//     const list = document.getElementById("myList");
//     list.removeChild(list.firstElementChild);

// };
