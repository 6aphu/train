const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAdmin = require("../middleware/authMiddleware");
const gymController = require("../controllers/gymController");

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.get("/subscriptions", gymController.getSubscriptions);
router.get("/subscriptions/:id", gymController.getSubscriptionById);

router.get("/admin", checkAdmin, (req, res) => {
    res.json({
        message: "Добро пожаловать, администратор"
    });
});

module.exports = router;