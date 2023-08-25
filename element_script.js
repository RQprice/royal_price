function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Получаем значение параметра "name" из URL
const elementName = getParameterByName('name');

// Отображаем наименование элемента на странице
const elementInfoDiv = document.getElementById('elementInfo');
elementInfoDiv.textContent = `${decodeURIComponent(elementName)}`;

// Функция для загрузки CSV файла и возврата данных
async function loadCSV() {
    const csvUrl = `https://raw.githubusercontent.com/RQprice/data/main/${elementName}.csv`;
    const response = await fetch(csvUrl);
    const csvData = await response.text();
    return csvData;
}

async function lastInfo(prices, times) {
    // Отображение информации о последней записи и цене
    if (times.length > 0 && prices.length > 0) {
      const lastTime = times[times.length - 1];
      const lastPrice = prices[prices.length - 1];
      
      const lastTimeDiv = document.getElementById('lastTime');
      lastTimeDiv.textContent = `Время замера: ${lastTime}`;
      
      const lastPriceDiv = document.getElementById('lastPrice');
      lastPriceDiv.textContent = `Текущая цена: ${lastPrice}`;
  }
}

async function changeGraph(days) {
  if (priceChart) {
    priceChart.destroy();
  }
  processData(days);
}

async function buildGraph(prices, times) {

  // Обновление графика с новыми данными
  const chartContainer = document.getElementById('chartContainer');
  priceChart = new Chart(chartContainer, {
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

async function processData(days) {
  const csvData = await loadCSV();
  const rows = csvData.split('\n').slice(0, -1);
  const times = [];
  timesLenght = times.lenght;
  const prices = [];

  rows.forEach(row => {
      const columns = row.split(',');
      if (columns.length === 2) {
          const time = columns[0].replace(/"/g, '');
          const price = columns[1].replace(/"|\n/g, '');
          times.push(time);
          prices.push(parseFloat(price));
      }
  });
  
  lastInfo(prices, times);
  
  const endDate = new Date(times[times.length - 1]);
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - days);
      
      const filteredPrices = [];
      const filteredTimes = [];
      
      times.forEach((time, index) => {
          const currentDate = new Date(time);
          if (currentDate >= startDate) {
              filteredPrices.push(prices[index]);
              filteredTimes.push(time);
          }
      });
  
  buildGraph(filteredPrices, filteredTimes);
}

document.addEventListener('DOMContentLoaded', () => {
    processData(1); // Call the function when the DOM is ready

    // Обработчики событий для кнопок времени
    const dayButton = document.getElementById('dayButton');
    const weekButton = document.getElementById('weekButton');
    const monthButton = document.getElementById('monthButton');
    const yearButton = document.getElementById('yearButton');
    const allTimeButton = document.getElementById('allTimeButton');
    
    dayButton.addEventListener('click', () => changeGraph(1));
    weekButton.addEventListener('click', () => changeGraph(7));
    monthButton.addEventListener('click', () => changeGraph(30));
    yearButton.addEventListener('click', () => changeGraph(365));
    allTimeButton.addEventListener('click', () => changeGraph(30000));
});