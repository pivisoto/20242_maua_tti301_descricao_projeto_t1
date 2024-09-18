const http = require('http');
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const readline = require('readline');
const app = express();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const server = http.createServer(app);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getCityCoordinates(city) {
    try {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.length === 0) {
            console.log('Cidade não encontrada');
        } else {
            const { lat, lon } = data[0];
            console.log(`Segue as informações de ${city} - Latitude: ${lat}, Longitude: ${lon}`);
            await getWeatherData(lat, lon);
        }
    } catch (error) {
        console.error('Erro ao chamar a API:', error.response ? error.response.data : error.message);
    }
}

async function getWeatherData(lat, lon) {
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const feelsLike = data.main.feels_like;
        const description = data.weather[0].description;

        console.log(`Sensação térmica: ${feelsLike}°C, Descrição: ${description}`);
    } catch (error) {
        console.error('Erro ao obter o clima:', error.response ? error.response.data : error.message);
    }
}

rl.question('Digite o nome da cidade: ', (city) => {
    getCityCoordinates(city);
    rl.close(); 
});