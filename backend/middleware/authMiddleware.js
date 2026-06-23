function checkAdmin(req, res, next) {

    const role = req.query.role;

    if (role !== "admin") {
        return res.status(403).json({
            message: "Доступ запрещён"
        });
    }

    next();
}

module.exports = checkAdmin;