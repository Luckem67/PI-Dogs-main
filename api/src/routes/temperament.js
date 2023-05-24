const { Router } = require("express");
const { getAllTemperaments } = require("../controllers/index");
const router = Router();

router.get("/", getAllTemperaments);

module.exports = router;
