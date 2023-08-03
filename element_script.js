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
          borderWidth: 2,
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
          },
        },
        elements: {
          line: {
            tension: 0,
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
    
    var originalLineDraw = Chart.controllers.line.prototype.draw;
    Chart.helpers.extend(Chart.controllers.line.prototype, {
    draw: function() {
        originalLineDraw.apply(this, arguments);

        var chart = this.chart;
        var ctx = chart.chart.ctx;

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
        var activePoint = this.chart.tooltip._active[0];
        var ctx = this.chart.ctx;
        var x = activePoint.tooltipPosition().x;
        var topY = this.chart.scales['y-axis-0'].top;
        var bottomY = this.chart.scales['y-axis-0'].bottom;

        // draw line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = '#eeeeee';
        ctx.stroke();
        ctx.restore();
    }
    }});
    
}

document.addEventListener('DOMContentLoaded', () => {
    processData(); // Call the function when the DOM is ready
  });