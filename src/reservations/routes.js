const { Router } = require("express");
const controller = require("./controller");
const isLoggined = require("../middlewares/isLoggined");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();

router.use("/", isLoggined, isAdmin);
router.get("/", (req, res) => controller.getReservations(req, res));

router.use("/user/:id", isLoggined);
router.get("/user/:id", (req, res) => controller.getReservationsById(req, res));

module.exports = router