const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статических файлов
app.use(express.static('public'));

// Собственный middleware - логгер
const logger = require('./middleware/logger');
app.use(logger);

// Маршруты
const pollRoutes = require('./routes/poll');
app.use('/api', pollRoutes);

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('Мини-опросник API');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});