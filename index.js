console.log("надо писать скрипт");

// присвоение имени пользователя
let user = 'elitanima';

// создаем экземпляр класса
let apiCats = new Api(user);

// получаем элементы с html-разметки
// со знака $ начинается переменная

$modalFormAdd = document.querySelector('#modalFormAdd'); // модальное окно добавления

$card_view = document.querySelector('#card_view'); // секция отображения карточек

// формирование html-карточек
let htmlCard = (cat) =>
    `<div class="card" data-cardId=${cat.id}>
    <div class"img_card" style="background-image: url(${cat.image})"></div>
    <h3>${cat.name}</h3>
    <p>Age ${cat.age} years</p>
    <button data-btn="description">About cat</button>
    <button class="basket" data-btn="delete">Delete</button>
</div>`

// async/await обработка ответов сервера

// показать карточки
const getCards = async function() {
    try {
        const res = await apiCats.getCards();
        // console.log(res);
        const data = await res.json();
        // console.log(data);

        // откуда метод на 37 строчке???
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
        return data;
    } catch (error) {
        alert(`Ошибка: ${error}`) // alert("Ошибка:" error)
    }
};

// слушатель на весь документ
document.addEventListener('click', (event) => {
    let key = event.target.dataset.btn;
    switch (key) {
        case 'show':
            getCards();
            break;

        case 'addCardForm':
            $modalFormAdd.classList.remove('hidden')
            break;


        case 'addFormClose':
            $modalFormAdd.classList.add('hidden')
            break;

        default:
            break;
    }
})


// слушатель на форму добавления
document.forms.addForName.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target).entries());
    data.id = Number(data.id);
    data.age = Number(data.age);
    data.rate = Number(data.rate);
    data.favorite = data.favorite === 'true';
    addCard(data);
    document.querySelector('#addFormId').reset();
});

// функция вормирования карточек
function updateCard(data) {
    console.log(data);
    data.forEach(cat => $card_view.insertAdjacentHTML('beforeend', htmlCard(cat)));
    // data.forEach(card => console.log(card))
    // data.forEach(cat => $card_view.insertAdjacentHTML("beforeend", testHtml(cat)));
}
