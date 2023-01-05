// создали класс JavaScript (class Api)
class Api {

    // создали конструктор (функцию)
    // сам user берётся в index.js

    constructor(user) {
        this.url = `https://cats.petiteweb.dev/api/single/${user}/`;
    }




    // создали функцию, чтобы показать все cards на странице
    getCards() {
        return fetch(`${this.url}show`);
    }




    // создали функцию для получения информации
    // по конкретной карточке
    getInfoAboutId() {
        return fetch(`${this.url}show/${id}`);
    }



    // создали функцию для добавления кота
    // после 33 строки это что???????????? как нашел/где взял?
    addCard(bodyOfCat) {
        return fetch(`${this.url}add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyOfCat)
        });
    }




    // создали функцию для редактирования/обновления информации о коте по id
    editCard(body, id) {
        return fetch(`${this.url}update/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }





    // создали функцию для удаления кота по id
    deleteCardById(id) {
        return fetch(`${this.url}delete/${id}`, {
            method: 'DELETE'
        });
    }



}