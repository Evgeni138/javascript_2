// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];
    get allbooks() {
        return this.#books;
    }

    addBook(title) {
        this.#books.forEach(book => {
            if (title === book) {
                throw new Error("Такая книга уже есть в списке.");
            }
        });
        this.#books.push(title);
    };

    removeBook(title) {
        const index = this.#books.indexOf(title);
        if (index > -1) {
            this.#books.splice(index, 1);
            console.log(`Книга ${title} удалена из списка.`);
            return true;
        }
        throw new Error("Нет такой книги в списке.");
    }

    hasBook(title) {
        const flag = this.#books.some(book => book === title);
        console.log(flag);
        if (flag) {
            console.log("Есть такая книга");
            return flag;
        } else {
            console.log("Нет такой книги.");
            return flag;
        }
    }

    constructor(books) {
        let dublicat = books.filter((value, index, self) => {
            return self.indexOf(value) !== index;
        })
        if (dublicat.length === 0) {
            this.#books = books;
        } else {
            throw new Error("Не корректный список, в списке присутствуют дубликаты.");
        }
    }

}

const list = ["Про ёлочку", "С картинками", "Веселая", "Для взрослых"];

let library = new Library(list);

library.addBook("Война и мир");

console.log(library.allbooks);

library.removeBook('Про ёлочку');
// library.removeBook('Про ёлочку');

library.hasBook("Веселая");



// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

const textBoxEl = document.querySelector('.info-box');

function outputTextData(data) {
    let dataString = `Product: ${data.product}<br/>`
    data.reviews.forEach(review => {
        dataString += `review: ${review.text} <br/>`
    });

    const paragraph = document.createElement('p');
    paragraph.classList.add('paragraph');
    paragraph.innerHTML = dataString;
    textBoxEl.appendChild(paragraph);
}

initialData.forEach(data => {
    outputTextData(data);
});

const deviceField = document.querySelector('.device');
const reviewField = document.querySelector('.review');
const btnSend = document.querySelector('.btnSend');

btnSend.addEventListener('click', function (e) {
    const deviceName = deviceField.value;
    const reviewText = reviewField.value;
    try {
        if (reviewText.length < 50 || reviewText > 500) {
            throw new Error("Некорректный размер отзыва.")
        } else {
            let newId = 0;
            initialData.forEach(data => {
                data.reviews.forEach(element => {
                    if (+element.id > newId) newId = element.id;
                });
            });
            const newReview = {
                id: `${newId + 1}`,
                text: reviewText
            }
            const newData = {
                product: deviceName,
                reviews: [newReview]
            }
            initialData.push(newData);
            outputTextData(newData);
            deviceField.value = '';
            reviewField.value = '';
        }
    } catch (error) {
        console.log(`Ошибка: ${error.message}`);
    }

});
