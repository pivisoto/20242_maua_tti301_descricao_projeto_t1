const http = require('http');
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const readline = require('readline');
const app = express();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const server = http.createServer(app);

// Configuração do readline para capturar a entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para obter as coordenadas da cidade
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
        }
    } catch (error) {
        console.error('Erro ao chamar a API:', error.response ? error.response.data : error.message);
    }
}

// Pergunta para o usuário digitar a cidade
rl.question('Digite o nome da cidade: ', (city) => {
    getCityCoordinates(city);
    rl.close(); // Fecha a interface readline após a resposta
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });
