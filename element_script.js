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
    const rows = csvData.split('\n').slice(0, -1);
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
    const chartContainer = document.getElementById('chartContainer');
    
    const priceChart = new Chart(chartContainer, {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: 'Цена',
          data: prices,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2.5,
          pointRadius: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: '#ffffff',
            },
          },
          y: {
            grid: {
              color: 'gray',
            },
            ticks: {
              color: '#ffffff',
            },
            offset: true, // добавляем отступ от края сетки по оси X
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
          axis: 'x',
          onHover: (event, chartElements) => {
            if (chartElements && chartElements.length > 0) {
              const index = chartElements[0].index;
              const xValue = priceChart.data.labels[index];
              const yValue = priceChart.data.datasets[0].data[index];
              const xPixel = priceChart.scales.x.getPixelForValue(xValue);
    
              const tooltip = new Chart.Tooltip({
                chart: priceChart,
                options: priceChart.options.tooltips,
                enabled: true,
              });
              tooltip.initialize();
              tooltip._active = [{ index }];
              tooltip.update(true);
              priceChart.draw();
            }
          },
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          axis: 'x',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          displayColors: false,
        },
      },
    });

}

document.addEventListener('DOMContentLoaded', () => {
    processData(); // Call the function when the DOM is ready
  });