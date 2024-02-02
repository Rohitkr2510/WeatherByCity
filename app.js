// app.js
async function getWeather() {
    const citiesInput = document.getElementById('citiesInput');
    const resultDiv = document.getElementById('result');
    const cities = citiesInput.value.split(',').map(city => city.trim());
  
    try {
      const response = await fetch('http://localhost:3000/getWeather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities }),
      });
  
      const data = await response.json();
  
      let resultHtml = '<h2>Weather Results</h2>';
      resultHtml += '<ul>';
      for (const [city, weather] of Object.entries(data.weather)) {
        resultHtml += `<li>${city}: ${weather}</li>`;
      }
      resultHtml += '</ul>';
  
      resultDiv.innerHTML = resultHtml;
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
    }
  }
  