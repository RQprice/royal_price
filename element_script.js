// Функция для загрузки CSV файла и возврата имени файла
function loadCSV() {
    const csvUrl = 'https://raw.githubusercontent.com/RQprice/royal_price/main/data/trophies_2023-07-29_00-07.csv';
    return fetch(csvUrl)
        .then((response) => response.text())
        .then((data) => {
            const match = csvUrl.match(/trophies_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2})\.csv/);
            const timeString = match ? match[1] : '';
            return { timeString, data };
        });
}

// Функция для парсинга CSV данных и получения цен для элемента
function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const prices = [];

    lines.forEach((line) => {
        const [item, price] = line.split(',');
        if (item.trim() === elementName) {
            const formattedPrice = price.trim().replace(/"/g, '');
            prices.push(formattedPrice);
        }
    });

    return prices;
}

// Функция для преобразования времени
function remakeTime(timeString) {
    const [datePart, timePart] = timeString.split('_');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split('-');

    const date = new Date(year, month - 1, day, hour, minute);
    const formattedDate = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;

    return formattedDate;
}

// Получаем значение параметра "name" из URL
const elementName = getParameterByName('name');

// Отображаем наименование элемента на странице
const elementInfoDiv = document.getElementById('elementInfo');
elementInfoDiv.textContent = `Наименование элемента: ${decodeURIComponent(elementName)}`;

// Загружаем и обрабатываем CSV файл
loadCSV()
    .then((fileData) => {
        const prices = parseCSV(fileData.data);
        if (prices.length > 0) {
            const price_time = remakeTime(fileData.timeString);
            const pricesList = document.createElement('ul');
            prices.forEach((price) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Цена: ${price}, Время: ${price_time}`;
                pricesList.appendChild(listItem);
            });
            elementInfoDiv.appendChild(pricesList);
        } else {
            elementInfoDiv.textContent = 'Цены для данного элемента не найдены в CSV файле.';
        }
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
    });
