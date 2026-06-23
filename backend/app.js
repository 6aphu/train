const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

// НАСТРОЙКА ПУТЕЙ (Проверь эти строки!)
// '../frontend' — выходим из папки backend на уровень вверх, в папку Сайт, и там ищем frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Навешиваем роуты на оба файла, чтобы открывалось по любому адресу
// ... вверху у тебя подключение express, apiRoutes и статики ...

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Роут для страницы регистрации (если переходят по /register или /register.html)
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'register.html'));
});

// НАДО ДОБАВИТЬ: Роут для страницы входа (обрабатывает и /login, и /login.html)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

// ... внизу app.listen ...
const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));