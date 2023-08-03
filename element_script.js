function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Получаем значение параметра "name" из URL
const elementName = getParameterByName('name');

// Отображаем наименование элемента на странице
const elementInfoDiv = document.getElementById('elementInfo');
elementInfoDiv.textContent = `Наименование элемента: ${decodeURIComponent(elementName)}`;

// Функция для загрузки CSV файла и возврата данных
async function loadCSV() {
    const csvUrl = `https://raw.githubusercontent.com/RQprice/data/main/${elementName}.csv`;
    const response = await fetch(csvUrl);
    const csvData = await response.text();
    return csvData;
}

// Функция для обработки CSV данных и отображения графика
async function processData() {
    const csvData = await loadCSV();
    const rows = csvData.split('\n').slice(1);
    const times = [];
    const prices = [];

    rows.forEach(row => {
        const columns = row.split(',');
        if (columns.length === 2) { // Проверяем, что columns содержит два элемента
            const time = columns[0].replace(/"/g, '');
            const price = columns[1].replace(/"|\n/g, '');
            times.push(time);
            prices.push(parseFloat(price));
        }
    });

    // Отображение данных на графике
    const ctx = document.getElementById('canvas').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Цена',
                data: prices,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

processData(); // Вызываем функцию обработки данных при загрузке страницы