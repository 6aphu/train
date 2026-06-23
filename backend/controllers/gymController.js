const subscriptions = [
    { id: 1, name: "Разовое посещение", price: 2000 },
    { id: 2, name: "1 месяц", price: 12000 },
    { id: 3, name: "3 месяца", price: 30000 },
    { id: 4, name: "12 месяцев", price: 110000 }
];

const getApiInfo = (req, res) => {
    res.json({
        message: "API is working"
    });
};

const getSubscriptions = (req, res) => {

    let result = [...subscriptions];

    // фильтрация
    if (req.query.name) {
        result = result.filter(item =>
            item.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }

    // сортировка
    if (req.query.sort === "asc") {
        result.sort((a, b) => a.price - b.price);
    }

    if (req.query.sort === "desc") {
        result.sort((a, b) => b.price - a.price);
    }

    // ограничение количества записей
    if (req.query.limit) {
        result = result.slice(0, Number(req.query.limit));
    }

    res.json(result);
};

const getSubscriptionById = (req, res) => {

    const id = Number(req.params.id);

    const subscription = subscriptions.find(item => item.id === id);

    if (!subscription) {
        return res.status(404).json({
            error: "Subscription not found"
        });
    }

    res.json(subscription);
};

module.exports = {
    getApiInfo,
    getSubscriptions,
    getSubscriptionById
};