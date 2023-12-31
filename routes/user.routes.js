const { Router } = require("express");
const login = require("../controllers/user.controllers");
const router = Router();

router.post("/api/login", login);

module.exports = router;
