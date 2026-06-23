const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const inputName = document.getElementById("name");
        const inputEmail = document.getElementById("email");
        const inputPassword = document.getElementById("password");
        const messageElement = document.getElementById("message");

        if (messageElement) {
            messageElement.textContent = "";
            messageElement.className = "";
        }

        const name = inputName.value.trim();
        const email = inputEmail.value.trim();
        const password = inputPassword.value;

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (messageElement) {
                    messageElement.textContent = "Регистрация успешна! Данные в SQLite.";
                    messageElement.style.color = "green";
                } else {
                    alert("Регистрация успешна! Данные сохранены в SQLite.");
                }
                registerForm.reset();
            } else {
                if (messageElement) {
                    messageElement.textContent = data.message || "Ошибка регистрации";
                    messageElement.style.color = "red";
                } else {
                    alert("Ошибка: " + data.message);
                }
            }

        } catch (error) {
            console.error("Ошибка сети:", error);
            if (messageElement) {
                messageElement.textContent = "Сервер бэкенда недоступен!";
                messageElement.style.color = "red";
            } else {
                alert("Ошибка соединения с сервером");
            }
        }
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const loginInput = document.getElementById("login");
        const passwordInput = document.getElementById("password");
        const loginError = document.getElementById("loginError");

        if (loginError) loginError.textContent = "";

        const email = loginInput.value.trim();
        const password = passwordInput.value;

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("isAuth", "true");
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Вход выполнен успешно!");
                window.location.href = "index.html"; 
            } else {
                if (loginError) {
                    loginError.textContent = data.message || "Неверный логин или пароль";
                } else {
                    alert("Ошибка: " + data.message);
                }
            }

        } catch (error) {
            console.error("Ошибка сети при авторизации:", error);
            if (loginError) loginError.textContent = "Сервер бэкенда недоступен!";
        }
    });
}