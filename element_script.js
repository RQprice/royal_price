// Функция для получения значения параметра из URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Получаем значение параметра "name" из URL
const elementName = getParameterByName('name');

// Отображаем наименование элемента на странице
const elementInfoDiv = document.getElementById('elementInfo');
elementInfoDiv.textContent = `Наименование элемента: ${decodeURIComponent(elementName)}`;

// Функция для загрузки CSV файла и возврата имени файла
function loadCSV(filename) {
    return fetch(filename)
        .then((response) => response.text())
        .then((data) => {
            const match = filename.match(/trophies_(\d{4}-\d{2}-\d{2}_\d{2}-\d{2})\.csv/);
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

const allPrices = [];
// Получаем список файлов в папке "data" с расширением .csv
fetch('../data/')
    .then((response) => response.text())
    .then((data) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const links = htmlDoc.querySelectorAll('a');

        const csvFiles = Array.from(links)
            .filter((link) => link.href.endsWith('.csv'))
            .map((link) => link.href);

        return Promise.all(csvFiles.map((file) => loadCSV(file)));
    })
    .then((fileDataList) => {
        fileDataList.forEach((fileData) => {
            const prices = parseCSV(fileData.data);
            if (prices.length > 0) {
                const price_time = remakeTime(fileData.timeString);
                allPrices.push({ prices, price_time });
            }
        });

        const flattenedPrices = allPrices.flat();
        // Отображаем цены и время на странице
        // const pricesList = document.createElement('ul');
        // flattenedPrices.forEach(({ prices, price_time }) => {
        //     const listItem = document.createElement('li');
        //     listItem.textContent = `Цена: ${prices.join(', ')}, Время: ${price_time}`;
        //     pricesList.appendChild(listItem);
        // });
        // elementInfoDiv.appendChild(pricesList);

        const chartLabels = allPrices.map(({ price_time }) => price_time);
        const chartData = allPrices.map(({ prices }) => prices.reduce((sum, price) => sum + parseFloat(price), 0) / prices.length);

        console.log("chartData:", chartData);
        console.log("chartLabels:", chartLabels);

        var context = document.getElementById('canvas').getContext('2d');
        var graph_data = {
            labels: chartLabels,
            datasets: [{
                label: 'Цена',
                data: chartData,
                pointBorderColor: 'rgba(255, 200, 0, 1)',
                pointBackgroundColor: 'rgba(255, 200, 0, 1)',
                borderColor: 'rgba(192, 192, 192, 192)',
                borderWidth: 3,
                
                fill: false,
            }],
        };


        // Построение графика
        var priceChart = new Chart(context, {
            type: 'line',
            data: graph_data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    })
    .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
    });
    