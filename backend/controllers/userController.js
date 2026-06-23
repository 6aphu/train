const db = require("../database/db");

exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Все поля обязательны" });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ message: "Неверный формат email" });
    }

    db.get("SELECT * FROM Users WHERE login = ?", [email], (err, row) => {
        if (err) {
            console.error("❌ ОШИБКА БД (при поиске):", err.message);
            return res.status(500).json({ message: "Ошибка базы данных" });
        }

        if (row) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const query = "INSERT INTO Users (login, password, name) VALUES (?, ?, ?)";
        
        db.run(query, [email, password, name], function (err) {
            if (err) {
                console.error("❌ ОШИБКА БД (при вставке):", err.message);
                return res.status(500).json({ message: "Ошибка при сохранении" });
            }

            return res.status(201).json({ message: "Регистрация успешна!" });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Заполните все поля" });
    }

    db.get("SELECT * FROM users WHERE login = ?", [email], (err, row) => {
        if (err) {
            console.error("❌ ОШИБКА БД при входе:", err.message);
            return res.status(500).json({ message: "Ошибка базы данных" });
        }

        if (!row) {
            return res.status(400).json({ message: "Пользователь с таким email не найден" });
        }

        if (row.password !== password) {
            return res.status(400).json({ message: "Неверный пароль" });
        }

        return res.status(200).json({
            message: "Вход выполнен успешно!",
            user: {
                id: row.id,
                name: row.name,
                email: row.login
            }
        });
    });
};